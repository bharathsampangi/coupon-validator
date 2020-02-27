export enum DiscountType {
  "FlatDiscount",
  "PercentDiscount"
}

export interface ResponseJson {
  valid: boolean;
  discount: number;
  message: string;
}

export type flatCouponInput = {
  discount_amount: number;
  coupon_code: string;
  minimum_amount: number;
  validity: number;
};

export type percentCouponInput = {
  coupon_code: string;
  minimum_amount: number;
  validity: number;
  discount_percentage: number;
  maximum_amount: number;
};
