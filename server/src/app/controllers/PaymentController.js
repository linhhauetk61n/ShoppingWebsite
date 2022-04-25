require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

class PaymentController {
    async payment(req, res) {
        stripe.charges.create(
            {
                source: req.body.tokenId,
                amount: req.body.amount,
                currency: "usd",
            },
            (stripeErr, stripeRes) => {
                if (stripeErr) {
                    return res
                        .status(500)
                        .json({ success: false, message: stripeErr });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Successful payment",
                        stripeRes,
                    });
                }
            }
        );
    }
}
module.exports = new PaymentController();
