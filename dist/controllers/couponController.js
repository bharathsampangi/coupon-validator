"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var coupons_1 = require("../models/coupons");
var flat_discount_1 = require("../models/flat-discount");
var percent_discount_1 = require("../models/percent-discount");
var DiscountType;
(function (DiscountType) {
    DiscountType[DiscountType["FlatDiscount"] = 0] = "FlatDiscount";
    DiscountType[DiscountType["PercentDiscount"] = 1] = "PercentDiscount";
})(DiscountType || (DiscountType = {}));
exports.addFlatCoupon = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var flatDiscount, coupon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                flatDiscount = new flat_discount_1.FlatDiscount({
                    discount_amount: 200
                });
                return [4 /*yield*/, flatDiscount.save()];
            case 1:
                _a.sent();
                coupon = new coupons_1.Coupon({
                    coupon_code: "Coupon1",
                    end_date: new Date(),
                    minimum_amount: 250,
                    discount: flatDiscount._id,
                    discountType: DiscountType.FlatDiscount
                });
                return [4 /*yield*/, coupon.save()];
            case 2:
                _a.sent();
                res.send("Success");
                return [2 /*return*/];
        }
    });
}); };
exports.addPercentCoupon = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var percentDiscount, coupon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                percentDiscount = new percent_discount_1.PercentDiscount({
                    discount_percentage: 50,
                    maximum_amount: 250
                });
                return [4 /*yield*/, percentDiscount.save()];
            case 1:
                _a.sent();
                coupon = new coupons_1.Coupon({
                    coupon_code: "Coupon2",
                    end_date: new Date(),
                    minimum_amount: 250,
                    discount: percentDiscount._id,
                    discountType: DiscountType.PercentDiscount
                });
                return [4 /*yield*/, coupon.save()];
            case 2:
                _a.sent();
                res.send("Success");
                return [2 /*return*/];
        }
    });
}); };
exports.getCoupon = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var coupon_code, coupons, coupon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coupon_code = req.body.coupon_code;
                coupon_code = coupon_code.trim();
                return [4 /*yield*/, coupons_1.Coupon.find()];
            case 1:
                coupons = _a.sent();
                coupon = coupons.find(function (coupon) { return coupon.coupon_code === coupon_code; });
                if (!coupon) {
                    res.status(404).json({
                        valid: false,
                        discount: 0,
                        message: "Sorry, we could not find your coupon!"
                    });
                }
                res.locals.coupon = coupon || null;
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.validateCoupon = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var total_amount, coupon, _a, end_date, minimum_amount;
    return __generator(this, function (_b) {
        total_amount = req.body.total_amount;
        coupon = res.locals.coupon;
        _a = coupon, end_date = _a.end_date, minimum_amount = _a.minimum_amount;
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
        return [2 /*return*/];
    });
}); };
var calculatePercentageDiscount = function (percentage, maxAmount, total) {
    //Expecting percentage to be in Base 10
    percentage = percentage / 100;
    var discount = total * percentage;
    if (discount > maxAmount) {
        discount = maxAmount;
    }
    return discount;
};
exports.calculateDiscount = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var total_amount, coupon, discountType, discount_amount, _a, discount_percentage, maximum_amount, discount;
    return __generator(this, function (_b) {
        total_amount = req.body.total_amount;
        coupon = res.locals.coupon;
        discountType = coupon.discountType;
        if (discountType === DiscountType[0]) {
            discount_amount = coupon.discount.discount_amount;
            res
                .status(200)
                .json({ valid: true, discount: discount_amount, message: "Success" });
        }
        _a = coupon.discount, discount_percentage = _a.discount_percentage, maximum_amount = _a.maximum_amount;
        discount = calculatePercentageDiscount(discount_percentage, maximum_amount, total_amount);
        res.status(200).json({
            valid: true,
            discount: discount,
            message: "Success"
        });
        return [2 /*return*/];
    });
}); };
