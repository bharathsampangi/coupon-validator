import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import "express-validator";
import path from "path";

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 5000;

//*const uri: string = "mongodb://localhost:27017/coupon-validator";
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
if (!dev) {
  app.use(helmet());
}
app.use(json());
app.get("/api/hello", (req: Request, res: Response) => res.send("Hello World"));
app.use("/api", couponRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message
  });
});

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets like our main.js, main.css file
  app.use(express.static("client/build"));

  //Express will serve up the index.html file if it doesn't recognize the route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening on PORT: ${port}`);
});
