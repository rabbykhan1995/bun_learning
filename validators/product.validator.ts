import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name must required"),
  salePrice: z.number().positive("Sale price must be positive"),
  purchasePrice: z.number().positive("Purchase price must be valid"),
  unitName: z.string().min(1, "Unit Must required"),
  unitID: z.string().min(1, "Unit Must required"),
  categoryName: z.string().min(1, "Category Must required"),
  categoryID: z.string().min(1, "Category Must required"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
