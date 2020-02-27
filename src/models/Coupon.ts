import { Schema, model, Model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { NextFunction } from "express";

export interface CouponProps extends Document {
  coupon_code: string;
  start_date: Date;
  end_date: Date;
  minimum_amount: number;
  discountType: string;
  discount: {};
}

const couponSchema = new Schema(
  {
    coupon_code: {
      type: Schema.Types.String,
      required: true,
      unique: true
    },
    start_date: { type: Schema.Types.Date, default: Date.now() },
    end_date: { type: Schema.Types.Date, required: true },
    minimum_amount: { type: Schema.Types.Number, required: true },
    discount: {
      type: Schema.Types.ObjectId,
      refPath: "discountType",
      required: true
    },
    discountType: {
      type: String,
      required: true,
      enum: ["PercentDiscount", "FlatDiscount"]
    }
  },
  { timestamps: { createdAt: true } }
);

couponSchema.plugin(uniqueValidator);

//autopopulate discount on each coupon
const autoPopulateDiscount = function(this: CouponProps, next: NextFunction) {
  this.populate("discount");
  next();
};

couponSchema.pre("find", autoPopulateDiscount);
couponSchema.pre("findOne", autoPopulateDiscount);

export const Coupon: Model<CouponProps> = model("Coupon", couponSchema);
