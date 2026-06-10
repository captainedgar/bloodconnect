import express from "express";
import cors from "cors";
import { env } from "@/config/env";
import authRoutes from "@/routes/auth-routes";
import userRoutes from "@/routes/user-routes";
import hospitalRoutes from "@/routes/hospital-routes";
import bloodBankRoutes from "@/routes/blood-bank-routes";
import bloodInventoryRoutes from "@/routes/blood-inventory-routes";
import { errorHandler } from "@/middlewares/error-handler";

const app = express();

const allowedOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/blood-banks", bloodBankRoutes);
app.use("/inventory", bloodInventoryRoutes);

app.use(errorHandler);

export default app;
