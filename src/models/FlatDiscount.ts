import { Schema, Model, model, Document } from "mongoose";

export interface FlatDiscountProps extends Document {
  discount_amount: number;
}

const flatDiscountSchema = new Schema({
  discount_amount: { type: Schema.Types.Number, required: true }
});

export const FlatDiscount: Model<FlatDiscountProps> = model(
  "FlatDiscount",
  flatDiscountSchema
);
