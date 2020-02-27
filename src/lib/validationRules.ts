import { body, ValidationChain } from "express-validator";

export const validateFlatCoupon = (): ValidationChain[] => {
  return [
    body("coupon_code")
      .isString()
      .notEmpty(),
    body("minimum_amount")
      .isNumeric()
      .notEmpty(),
    body("discount_amount")
      .isNumeric()
      .notEmpty(),
    body("validity")
      .isInt()
      .notEmpty()
  ];
};

export const validatePercentCoupon = (): ValidationChain[] => {
  return [
    body("coupon_code")
      .isString()
      .notEmpty(),
    body("minimum_amount")
      .isNumeric()
      .notEmpty(),
    body("validity")
      .isInt()
      .notEmpty(),
    body("discount_percentage")
      .isNumeric()
      .notEmpty()
      .custom(value => {
        if (value <= 0 || value >= 100) {
          throw new Error("Discount percentage should be between 1 and 100");
        }
        return true;
      }),
    body("maximum_amount")
      .isNumeric()
      .notEmpty()
  ];
};
