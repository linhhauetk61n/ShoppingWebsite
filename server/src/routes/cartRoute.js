const express = require("express");
const router = express.Router();
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyToken,
} = require("../app/middleware/verifyToken");
const CartController = require("../app/controllers/CartController");

router.post("/", verifyToken, CartController.create);
router.put("/:id", verifyTokenAndAuthorization, CartController.update);
router.delete("/:id", verifyTokenAndAuthorization, CartController.delete);
router.get("/find/:userId", verifyTokenAndAuthorization, CartController.get);
router.get("/", verifyTokenAndAdmin, CartController.getAll);

module.exports = router;
