import express from "express";
import type { Request, Response } from "express";
const router = express.Router();

router.get("/login", async (req: Request, res: Response) => {
  return res.json({ msg: "OK" });
});

export default router;
