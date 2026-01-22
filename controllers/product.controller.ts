import type { Request, Response } from "express";
import type {
  CreateProduct,
  Product,
  ProductList,
} from "../types/product.type";
import { createProduct, getProducts } from "../models/product.model";

export class ProductController {
  static async create(req: Request, res: Response) {
    const product: CreateProduct = req.body;

    // later will come from microservice
    const images: string[] = ["demo1.img", "demo2.img", "demo3.img"];
    const thumbnail: string = "thumbnail.img";

    const newProduct: Product = await createProduct(product, images, thumbnail);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  }

  static async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = String(req.query.search || "");
    const barcode = String(req.query.barcode || "");

    const { data, total } = await getProducts(page, limit, search, barcode);

    return res.status(201).json({
      success: true,
      message: "Product fetched successfully",
      data,
      total,
      page,
      limit,
    });
  }
}
