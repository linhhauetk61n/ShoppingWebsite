const Order = require("../models/Order");

class OrderController {
    async create(req, res) {
        const newOrder = new Order(req.body);

        try {
            const savedOrder = await newOrder.save();
            return res.status(200).json({
                success: true,
                message: "Created new Order",
                savedOrder,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    async update(req, res) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                message: "Order has been updated",
                updatedOrder,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //delete
    async delete(req, res) {
        try {
            await Order.findByIdAndDelete(req.params.id);
            return res
                .status(200)
                .json({ success: true, message: "Order has been deleted" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //Get order by userId
    async get(req, res) {
        try {
            const orders = await Order.find({ userId: req.params.userId });
            return res.status(200).json({ success: true, orders });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //Get All
    async getAll(req, res) {
        try {
            const orders = await Order.find();
            return res.status(200).json({ success: true, orders });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //Get Monthly Income
    async statsIncome(req, res) {
        const productId = req.query.pid;
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(
            new Date().setMonth(lastMonth.getMonth() - 1)
        );

        try {
            const income = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: previousMonth },
                        ...(productId && {
                            products: { $elemMatch: { productId } },
                        }),
                    },
                },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount",
                    },
                },
                { $group: { _id: "$month", total: { $sum: "$sales" } } },
            ]).sort({ createdAt: -1 });
            return res.status(200).json({ success: true, income });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
}
module.exports = new OrderController();
