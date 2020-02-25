import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 5000;

//const uri: string = "mongodb://localhost:27017/coupon-validator";
const mongoURI: string = process.env.MONGO_URI!;

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  err => {
    if (err) return console.log("DB Connection Error", err.message);
  }
);

import couponRoutes from "./routes/couponRoutes";

const app = express();
app.use(json());
app.use("/coupons", couponRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message
  });
});

app.listen(port);
