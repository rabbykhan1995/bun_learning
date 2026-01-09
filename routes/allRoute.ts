import express from "express";
import authRouter from "./auth.route.ts";
import productRoute from "./product.routes.ts";

const server = express();
server.use("/auth", authRouter);
server.use("/product", productRoute);
export default server;
