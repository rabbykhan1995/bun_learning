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
  thumbnail: string | null;
  images: string[];
};
// CreateProduct type (user sends only these fields)
export type CreateProduct = Omit<
  Product,
  "id" | "slug" | "thumbnail" | "images"
>;
