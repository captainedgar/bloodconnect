import express from "express";
import cors from "cors";
import { env } from "@/config/env";
import authRoutes from "@/routes/auth-routes";
import userRoutes from "@/routes/user-routes";
import { errorHandler } from "@/middlewares/error-handler";

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

export default app;
