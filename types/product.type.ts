export type Product = {
  id: string;
  name: string;
  salePrice: number;
  description: string | null;
  purchasePrice: number;
  stock: number;
  unitName: string;
  unitID: string;
  slug: string;
  categoryName: string;
  categoryID: string;
  barcode: string | null;
  thumbnail: string | null;
  images: string[];
};
// CreateProduct type (user sends only these fields)
export type CreateProduct = Omit<
  Product,
  "id" | "slug" | "thumbnail" | "images"
>;

export type ProductListItem = Pick<
  Product,
  | "id"
  | "name"
  | "salePrice"
  | "purchasePrice"
  | "slug"
  | "thumbnail"
  | "barcode"
>;

export type ProductList = ProductListItem[];

export type ProductListQuery = {
  name: string | null;
  limit: number;
  page: number;
};

export type UpdateProduct = Partial<
  Pick<Product, "name" | "salePrice" | "purchasePrice">
>;
