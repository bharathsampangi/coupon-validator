"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var percentDiscountSchema = new mongoose_1.Schema({
    discount_percentage: { type: mongoose_1.Schema.Types.Number, required: true },
    maximum_amount: { type: mongoose_1.Schema.Types.Number, required: true }
});
exports.PercentDiscount = mongoose_1.model("PercentDiscount", percentDiscountSchema);
