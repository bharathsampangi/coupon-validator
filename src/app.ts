import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

import couponRoutes from "./routes/couponRoutes";

const uri: string = "mongodb://localhost:27017/coupon-validator";

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) return console.log("Error", err.message);
    console.log("Connected successfully!");
  }
);

const app = express();
app.use(json());
app.use("/coupons", couponRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message
  });
});

app.listen(5000);
