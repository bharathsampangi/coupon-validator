import {RequestHandler} from "express"

export const checkInput : RequestHandler = (req, res, next) => {
    const {coupon_code, total_amount} = req.body;
    if(!coupon_code && !total_amount) {
        res.send(400).send("Invalid Input")
    }
    next();
}