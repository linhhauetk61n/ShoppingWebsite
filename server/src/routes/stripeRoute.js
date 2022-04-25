const express = require("express");
const router = express.Router();
const PaymentController = require("../app/controllers/PaymentController");
router.post("/payment", PaymentController.payment);

module.exports = router;
