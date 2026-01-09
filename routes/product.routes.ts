import express from "express";
import type { Request, Response } from "express";
import type { Product, CreateProduct } from "../types/product.type";
import { createProduct } from "../models/product.model";

const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  res.json({
    msg: "Done",
  });
});
router.post("/create", async (req: Request, res: Response) => {
  const product: CreateProduct = req.body;

  // next time we will get the images and thumbnails from another microservice;
  const images: string[] = ["demo1.img", "demo2.img", "demo3.img"];
  const thumbnail: string = "thumbnail.img";

  const newProduct: Product = await createProduct(product, images, thumbnail);

  return res
    .status(201)
    .json({ msg: "Product has been successfully created", result: newProduct });
});
export default router;
