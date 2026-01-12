import { Router } from "express";
import authRouter from "./auth.route.ts";
import productRoute from "./product.routes.ts";

const router = Router();
router.use("/auth", authRouter);
router.use("/product", productRoute);

export default router;
