"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var couponSchema = new mongoose_1.Schema({
    coupon_code: { type: mongoose_1.Schema.Types.String, required: true, unique: true },
    start_date: { type: mongoose_1.Schema.Types.Date, default: Date.now() },
    end_date: { type: mongoose_1.Schema.Types.Date, required: true },
    minimum_amount: { type: mongoose_1.Schema.Types.Number, required: true },
    discount: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: "discountType",
        required: true
    },
    discountType: {
        type: String,
        required: true,
        enum: ["PercentDiscount", "FlatDiscount"]
    }
}, { timestamps: { createdAt: true } });
couponSchema.plugin(mongoose_unique_validator_1.default);
//autopopulate discount on each coupon
var autoPopulateDiscount = function (next) {
    this.populate("discount");
    next();
};
couponSchema.pre("find", autoPopulateDiscount);
couponSchema.pre("findOne", autoPopulateDiscount);
exports.Coupon = mongoose_1.model("Coupon", couponSchema);
