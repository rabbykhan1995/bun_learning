import pool from "../utils/db.config";
import type { CreateProduct, Product } from "../types/product.type";

export const createProduct = async (
  product: CreateProduct,
  images: string[],
  thumbnail: string
): Promise<Product> => {
  const result = await pool.query(
    `
    INSERT INTO products
    (
      name,
      sale_price,
      purchase_price,
      stock,
      unit_name,
      unit_id,
      category_name,
      category_id,
      images,
      thumbnail
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *
    `,
    [
      product.name,
      product.salePrice,
      product.purchasePrice,
      product.stock,
      product.unitName,
      product.unitID,
      product.categoryName,
      product.categoryID,
      images,
      thumbnail,
    ]
  );

  return result.rows[0] as Product;
};
