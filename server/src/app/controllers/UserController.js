const User = require("../models/User");

class UserController {
    //Update
    async update(req, res) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASSWORD_SECRET
            ).toString();
        }
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res
                .status(200)
                .json({ success: true, message: "Updated User", updateUser });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    async delete(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res
                .status(200)
                .json({ success: true, message: "User has been delete" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //Get user by id
    async get(req, res) {
        try {
            const user = await User.findById(req.params.id).select("-password");
            return res.status(200).json({ success: true, user });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    async getAll(req, res) {
        try {
            const users = req.query.new
                ? await User.find()
                      .select("-password")
                      .sort({ _id: -1 })
                      .limit(5)
                : await User.find().select("-password");
            return res.status(200).json({ success: true, users });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    async getStats(req, res) {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                { $project: { month: { $month: "$createdAt" } } },
                { $group: { _id: "$month", total: { $sum: 1 } } },
            ]).sort({ createdAt: -1 });
            return res.status(200).json({ success: true, data });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
}
module.exports = new UserController();
