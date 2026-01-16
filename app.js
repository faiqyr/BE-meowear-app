import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();

const app = express();

// 1. SECURITY FIX: Manual Sanitization to avoid Vercel "Getter" Error
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  // We skip query/params to prevent the Vercel crash
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

// Routes
import authRouter from "./routes/authRouter.js";
import ProductRouter from "./routes/productRouter.js";
import OrderRouter from "./routes/orderRouter.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/order", OrderRouter);

app.use(notFound);
app.use(errorHandler);

// 2. CONNECTION FIX:
// Connect to DB immediately
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.log("❌ Database Connection Error:", err));

// 3. EXPORT/LISTEN FIX:
// Only use app.listen when NOT on Vercel (Local Development)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 App listening on port ${port}`);
  });
}

// Crucial for Vercel:
export default app;