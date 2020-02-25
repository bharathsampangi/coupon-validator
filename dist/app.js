"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var mongoose_1 = __importDefault(require("mongoose"));
var couponRoutes_1 = __importDefault(require("./routes/couponRoutes"));
var uri = "mongodb://localhost:27017/coupon-validator";
mongoose_1.default.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err)
        return console.log("Error", err.message);
    console.log("Connected successfully!");
});
var app = express_1.default();
app.use(body_parser_1.json());
app.use("/coupons", couponRoutes_1.default);
app.use(function (err, req, res, next) {
    res.status(500).json({
        message: err.message
    });
});
app.listen(5000);
