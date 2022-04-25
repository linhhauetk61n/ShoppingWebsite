const express = require("express");
const router = express.Router();
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyToken,
} = require("../app/middleware/verifyToken");

const OrderController = require("../app/controllers/OrderController");

router.post("/", verifyToken, OrderController.create);
router.put(":id", verifyTokenAndAdmin, OrderController.update);
router.delete("/:id", verifyTokenAndAdmin, OrderController.delete);
router.get("/find/:userId", verifyTokenAndAuthorization, OrderController.get);
router.get("/", verifyTokenAndAdmin, OrderController.getAll);
router.get("/income", verifyTokenAndAdmin, OrderController.statsIncome);

module.exports = router;
