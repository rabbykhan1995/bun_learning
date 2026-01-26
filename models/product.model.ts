import pool from "../utils/db.config";
import type {
  CreateProduct,
  Product,
  ProductList,
} from "../types/product.type";
import slugify from "slugify";
import Helper from "../utils/helper";

const createProductsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      slug TEXT UNIQUE DEFAULT '',
      barcode TEXT UNIQUE,
      sale_price NUMERIC NOT NULL,
      purchase_price NUMERIC NOT NULL,
      stock INTEGER NOT NULL,
      unit_name TEXT NOT NULL,
      unit_id TEXT NOT NULL,
      category_name TEXT NOT NULL,
      category_id TEXT NOT NULL,
      images TEXT[] NOT NULL,
      thumbnail TEXT,
      created_at TIMESTAMP DEFAULT now()
    );
  `);
};

export const createProduct = async (
  product: CreateProduct,
  images: string[],
  thumbnail: string,
): Promise<Product> => {
  console.log(product);
  // Step 1: Ensure table exists
  await createProductsTable();
  let slug = slugify(product.name, { lower: true });
  let exists = await pool.query("SELECT id FROM products WHERE slug=$1", [
    slug,
  ]);

  if (exists.rows.length > 0) {
    slug = `${slugify(product.name, { lower: true })}-${Helper.randomSuffix()}`;
    exists = await pool.query("SELECT id FROM products WHERE slug = $1", [
      slug,
    ]);
  }

  if (product.barcode) {
    const barcodeExists = await pool.query(
      `SELECT id FROM products WHERE barcode = $1`,
      [product.barcode],
    );

    if (barcodeExists.rows.length > 0) {
      throw new Error("This barcode already exists");
    }
  }

  const result = await pool.query(
    `
  INSERT INTO products
  (
    name,
    slug,
    sale_price,
    purchase_price,
    stock,
    unit_name,
    unit_id,
    category_name,
    category_id,
    images,
    thumbnail, 
    barcode
  )
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
  RETURNING *
  `,
    [
      product.name,
      slug, // generate slug dynamically
      product.salePrice,
      product.purchasePrice,
      product.stock,
      product.unitName,
      product.unitID,
      product.categoryName,
      product.categoryID,
      images || [], // must be an array
      thumbnail || null, // optional
      product.barcode, // optional
    ],
  );

  return result.rows[0] as Product;
};

export const getProducts = async (
  page = 1,
  limit = 10,
  search = "",
  barcode = "",
): Promise<{
  data: ProductList;
  page: number;
  total: number;
  limit: number;
}> => {
  // Step 1: Ensure table exists
  await createProductsTable();
  const offset = (page - 1) * limit;

  const searchQuery = search
    ? `WHERE name ILIKE $1 OR slug ILIKE $1 OR barcode ILIKE $1`
    : "";

  let query = "";
  let values = [];

  if (barcode) {
    // 🔹 Barcode given → return single product
    query = `
      SELECT 
        id,
        name,
        sale_price AS "salePrice",
        slug,
        thumbnail,
        barcode
      FROM products
      WHERE barcode = $1
      LIMIT 1
    `;
    values = [barcode];
  } else {
    const searchQuery = search
      ? `WHERE name ILIKE $1 OR slug ILIKE $1 OR barcode ILIKE $1`
      : "";
    values = search ? [`%${search}%`, limit, offset] : [limit, offset];
    query = `
    SELECT
    id,
    name,
    sale_price AS "salePrice",
    slug,
    thumbnail,
    barcode
    FROM products 
    ${searchQuery} 
    ORDER BY id DESC
    LIMIT $${search ? 2 : 1}
    OFFSET $${search ? 3 : 2}`;
  }

  const result = await pool.query(query, values);

  let total = 0;
  if (barcode) {
    total = result.rows.length; // either 0 or 1
  } else {
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM products ${search ? `WHERE name ILIKE $1 OR slug ILIKE $1 OR barcode ILIKE $1` : ""}`,
      search ? [`%${search}%`] : [],
    );
    total = Number(countResult.rows[0].count);
  }

  return {
    data: result.rows as ProductList, // ✅ make TS happy
    total,
    page,
    limit,
  };
};
