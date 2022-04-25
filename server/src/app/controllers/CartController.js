const Cart = require("../models/Cart");

class CartController {
    async create(req, res) {
        const newCart = new Cart(req.body);

        try {
            const savedCart = await newCart.save();
            return res.status(200).json({
                success: true,
                message: "Created new Cart",
                savedCart,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //update
    async update(req, res) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                message: "Cart has been updated",
                updatedCart,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //delete
    async delete(req, res) {
        try {
            await Cart.findByIdAndDelete(req.params.id);
            return res
                .status(200)
                .json({ success: true, message: "Cart has been deleted" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //Get cart by id
    async get(req, res) {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId });
            return res.status(200).json({ success: true, cart });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //Get All
    async getAll(req, res) {
        try {
            const carts = await Cart.find();
            return res.status(200).json({ success: true, carts });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
}
module.exports = new CartController();
