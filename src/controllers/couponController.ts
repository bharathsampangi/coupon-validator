import { RequestHandler } from "express";

import { Coupon, CouponProps } from "../models/Coupon";
import { FlatDiscount } from "../models/FlatDiscount";
import { PercentDiscount } from "../models/PercentDiscount";
import { validationResult } from "express-validator";

import {
  flatCouponInput,
  percentCouponInput,
  DiscountType,
  ResponseJson
} from "../types/coupons";

export const addFlatCoupon: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let { discount_amount, coupon_code, minimum_amount, validity } = <
    flatCouponInput
  >req.body;
  let end_date = new Date();
  end_date.setDate(end_date.getDate() + validity);

  const flatDiscount = new FlatDiscount({
    discount_amount
  });

  await flatDiscount.save();

  const coupon = new Coupon({
    coupon_code,
    end_date,
    minimum_amount,
    discount: flatDiscount._id,
    discountType: DiscountType[0]
  });
  await coupon.save();
  res
    .status(200)
    .json({ success: true, message: "Flat Coupon added successfully!" });
};

export const addPercentCoupon: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let {
    coupon_code,
    minimum_amount,
    validity,
    discount_percentage,
    maximum_amount
  } = <percentCouponInput>req.body;

  let end_date = new Date();
  end_date.setDate(end_date.getDate() + validity);

  const percentDiscount = new PercentDiscount({
    discount_percentage,
    maximum_amount
  });

  await percentDiscount.save();

  const coupon = new Coupon({
    coupon_code,
    end_date,
    minimum_amount,
    discount: percentDiscount._id,
    discountType: DiscountType[1]
  });
  await coupon.save();
  res
    .status(200)
    .json({ success: true, message: "Percent coupon added successfully!" });
};

export const getCoupon: RequestHandler = async (req, res, next) => {
  let { coupon_code } = <{ coupon_code: string }>req.body;

  coupon_code = coupon_code.trim();

  const coupons = await Coupon.find();
  const coupon = coupons.find(coupon => coupon.coupon_code === coupon_code);

  if (!coupon) {
    res.status(404).json(<ResponseJson>{
      valid: false,
      discount: 0,
      message: "Sorry, we could not find your coupon!"
    });
  }

  res.locals.coupon = coupon || null;
  next();
};

export const validateCoupon: RequestHandler = (req, res, next) => {
  let { total_amount } = <{ total_amount: number }>req.body;
  const coupon: CouponProps = res.locals.coupon;

  const { end_date, minimum_amount } = <CouponProps>coupon;

  if (end_date.getTime() < Date.now()) {
    res.status(406).json(<ResponseJson>{
      valid: false,
      discount: 0,
      message: "Sorry, your coupon has been expired!"
    });
  }

  if (total_amount < minimum_amount) {
    res.status(406).json(<ResponseJson>{
      valid: false,
      discount: 0,
      message: "Sorry, your total cart value is less than minimum amount!"
    });
  }

  next();
};

const calculatePercentageDiscount = (
  percentage: number,
  maxAmount: number,
  total: number
): number => {
  //Expecting percentage to be in Base 10
  percentage = percentage / 100;
  let discount = total * percentage;
  if (discount > maxAmount) {
    discount = maxAmount;
  }
  return discount;
};

export const calculateDiscount: RequestHandler = (req, res, next) => {
  let { total_amount } = req.body;
  const coupon: CouponProps = res.locals.coupon;

  const { discountType } = <CouponProps>coupon;

  if (discountType === DiscountType[0]) {
    const { discount_amount } = <{ discount_amount: number }>coupon!.discount;
    res.status(200).json(<ResponseJson>{
      valid: true,
      discount: discount_amount,
      message: "Success - your coupon has been applied."
    });
  }

  const { discount_percentage, maximum_amount } = <
    { discount_percentage: number; maximum_amount: number }
  >coupon.discount;
  const discount = calculatePercentageDiscount(
    discount_percentage,
    maximum_amount,
    total_amount
  );
  res.status(200).json(<ResponseJson>{
    valid: true,
    discount,
    message: "Success - your coupon has been applied."
  });
};
