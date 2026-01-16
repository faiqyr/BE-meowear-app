import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Good practice: Allow .env to set port

// Middleware
app.use(express.json());
app.use(helmet())
app.use(
  mongoSanitize({
    allowDots: true,
    replaceWith: "_",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public")); //ini untuk folder publicnya bisa diaskses di web browser

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
mongoose
  .connect(process.env.DATABASE) // removed empty object {}, not needed in new Mongoose
  .then(() => {
    console.log("✅ Database Connected");
    // Only start server IF database connects successfully
    app.listen(port, () => {
      console.log(`🚀 App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ Database Connection Error:", err);
  });
