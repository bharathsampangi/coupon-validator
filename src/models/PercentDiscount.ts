import { Schema, model, Model, Document } from "mongoose";

interface PercentDiscountProps extends Document {
  discount_percent: number;
  maximum_amount: number;
}

const percentDiscountSchema = new Schema({
  discount_percentage: { type: Schema.Types.Number, required: true },
  maximum_amount: { type: Schema.Types.Number, required: true }
});

export const PercentDiscount: Model<PercentDiscountProps> = model(
  "PercentDiscount",
  percentDiscountSchema
);
