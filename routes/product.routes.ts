import express from "express";
import { validate } from "../middlewares/validation";
import { createProductSchema } from "../validators/product.validator";
import { asyncHandler } from "../utils/asyncHandler";
import { ProductController } from "../controllers/product.controller";

const router = express.Router();

router
  .post(
    "/create",
    validate(createProductSchema),
    asyncHandler(ProductController.create),
  )
  .get("/list", asyncHandler(ProductController.list));
export default router;
