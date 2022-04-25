const express = require("express");
const router = express.Router();
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../app/middleware/verifyToken");
const UserController = require("../app/controllers/UserController");

router.get("/stats", verifyTokenAndAdmin, UserController.getStats);
router.get("/find/:id", verifyTokenAndAdmin, UserController.get);
router.put("/:id", verifyTokenAndAuthorization, UserController.update);
router.delete("/:id", verifyTokenAndAuthorization, UserController.delete);
router.get("/", verifyTokenAndAdmin, UserController.getAll);
module.exports = router;
