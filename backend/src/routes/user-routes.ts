import { Router } from "express";
import * as userController from "@/controllers/user-controller";
import { authMiddleware } from "@/middlewares/auth";

const router = Router();

router.get("/me", authMiddleware, userController.getMe);

export default router;
