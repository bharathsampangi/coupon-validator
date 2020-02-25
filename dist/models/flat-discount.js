"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var flatDiscountSchema = new mongoose_1.Schema({
    discount_amount: { type: mongoose_1.Schema.Types.Number, required: true }
});
exports.FlatDiscount = mongoose_1.model("FlatDiscount", flatDiscountSchema);
