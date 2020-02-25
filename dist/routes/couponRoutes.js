"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var couponController_1 = require("../controllers/couponController");
var router = express_1.Router();
router.post("/validate", couponController_1.getCoupon, couponController_1.validateCoupon, couponController_1.calculateDiscount);
router.get("/add-flat-coupon", couponController_1.addFlatCoupon);
router.get("/add-percent-coupon", couponController_1.addPercentCoupon);
exports.default = router;
