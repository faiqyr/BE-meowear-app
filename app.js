import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();

const app = express();
// const port = process.env.PORT || 3000; // Dipindahkan ke bawah agar tidak conflict dengan Vercel

// Middleware
app.use(express.json());
app.use(helmet());

/* KODE SEBELUMNYA (MENYEBABKAN ERROR 500 DI VERCEL):
  app.use(
    mongoSanitize({
      allowDots: true,
      replaceWith: "_",
    })
  );
  ALASAN: Vercel melindungi properti 'query'. Middleware ini mencoba mengubahnya secara paksa.
*/

// PERBAIKAN: Sanitasi manual hanya pada body untuk keamanan tanpa merusak sistem Vercel
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public")); 

import authRouter from "./routes/authRouter.js";
import ProductRouter from "./routes/productRouter.js";
import OrderRouter from "./routes/orderRouter.js";

// Parent Router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/order", OrderRouter);

app.use(notFound);
app.use(errorHandler);

// Server Connection DB
/*
  KODE SEBELUMNYA:
  mongoose.connect(process.env.DATABASE).then(() => {
     app.listen(port, ...)
  })
  ALASAN: Di Vercel (Serverless), app.listen tidak boleh dibungkus di dalam promise 
  karena Vercel perlu mendeteksi objek 'app' segera saat cold start.
*/

// PERBAIKAN: Jalankan koneksi DB secara independen
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.log("❌ Database Connection Error:", err));

// PERBAIKAN: Gunakan app.listen hanya untuk LOCAL development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 App listening on port ${port}`);
  });
}

// WAJIB UNTUK VERCEL: Export default agar Vercel mengenali aplikasi Express Anda
export default app;