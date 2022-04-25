const express = require("express");
const router = express.Router();
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../app/middleware/verifyToken");
const ProductController = require("../app/controllers/ProductController");
router.get("/:id", ProductController.get);
router.put("/:id", verifyTokenAndAdmin, ProductController.update);
router.delete("/:id", verifyTokenAndAdmin, ProductController.delete);
router.get("/", ProductController.getAll);
router.post("/", verifyTokenAndAdmin, ProductController.create);

module.exports = router;
