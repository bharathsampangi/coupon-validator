import { Router } from "express";

import {
  addFlatCoupon,
  addPercentCoupon,
  getCoupon,
  validateCoupon,
  calculateDiscount
} from "../controllers/couponController";

const router = Router();

router.post("/validate", getCoupon, validateCoupon, calculateDiscount);

router.get("/add-flat-coupon", addFlatCoupon);
router.get("/add-percent-coupon", addPercentCoupon);

export default router;
