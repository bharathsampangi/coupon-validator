import { RequestHandler } from "express";

import { Coupon, CouponProps } from "../models/Coupon";
import { FlatDiscount } from "../models/FlatDiscount";
import { PercentDiscount } from "../models/PercentDiscount";

enum DiscountType {
  "FlatDiscount",
  "PercentDiscount"
}

interface ResponseMessage {
  valid: boolean;
  discount: number;
  message: string;
}

export const addFlatCoupon: RequestHandler = async (req, res, next) => {
  const flatDiscount = new FlatDiscount({
    discount_amount: 200
  });

  await flatDiscount.save();

  const coupon = new Coupon({
    coupon_code: "Coupon1",
    end_date: new Date(),
    minimum_amount: 250,
    discount: flatDiscount._id,
    discountType: DiscountType.FlatDiscount
  });
  await coupon.save();
  res.send("Success");
};

export const addPercentCoupon: RequestHandler = async (req, res, next) => {
  const percentDiscount = new PercentDiscount({
    discount_percentage: 50,
    maximum_amount: 250
  });

  await percentDiscount.save();

  const coupon = new Coupon({
    coupon_code: "Coupon2",
    end_date: new Date(),
    minimum_amount: 250,
    discount: percentDiscount._id,
    discountType: DiscountType.PercentDiscount
  });
  await coupon.save();
  res.send("Success");
};

export const getCoupon: RequestHandler = async (req, res, next) => {
  let { coupon_code } = req.body;

  coupon_code = coupon_code.trim();

  const coupons = await Coupon.find();
  const coupon = coupons.find(coupon => coupon.coupon_code === coupon_code);

  if (!coupon) {
    res.status(404).json({
      valid: false,
      discount: 0,
      message: "Sorry, we could not find your coupon!"
    });
  }

  res.locals.coupon = coupon || null;
  next();
};

export const validateCoupon: RequestHandler = async (req, res, next) => {
  let { total_amount } = req.body;
  const coupon = res.locals.coupon;

  const { end_date, minimum_amount } = <CouponProps>coupon;

  if (end_date.getTime() < Date.now()) {
    res.status(401).json({
      valid: false,
      discount: 0,
      message: "Sorry, your coupon has been expired!"
    });
  }

  if (total_amount < minimum_amount) {
    res.status(401).json({
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
) => {
  //Expecting percentage to be in Base 10
  percentage = percentage / 100;
  let discount = total * percentage;
  if (discount > maxAmount) {
    discount = maxAmount;
  }
  return discount;
};

export const calculateDiscount: RequestHandler = async (req, res, next) => {
  let { total_amount } = req.body;
  const coupon = res.locals.coupon;

  const { discountType } = <CouponProps>coupon;

  if (discountType === DiscountType[0]) {
    const { discount_amount } = <any>coupon!.discount;
    res
      .status(200)
      .json({ valid: true, discount: discount_amount, message: "Success" });
  }

  const { discount_percentage, maximum_amount } = <any>coupon!.discount;
  const discount = calculatePercentageDiscount(
    discount_percentage,
    maximum_amount,
    total_amount
  );
  res.status(200).json({
    valid: true,
    discount,
    message: "Success"
  });
};
