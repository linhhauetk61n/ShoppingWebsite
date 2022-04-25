const User = require("../models/User");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

class AuthController {
    //Register
    async register(req, res) {
        const { username, email, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing username or password",
            });
        }
        try {
            //Check for exist user
            const hasUser = await User.findOne({ username });
            const hasEmail = await User.findOne({ email });
            if (hasUser || hasEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Username or Email are already taken",
                });
            }
            //All good

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.PASSWORD_SECRET
                ).toString(),
            });
            const savedUser = await newUser.save();
            const { password, ...returnUser } = savedUser._doc;
            return res.status(201).json({ success: true, user: returnUser });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
    //Login
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing username or password",
            });
        }
        try {
            //Check for existing user
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect username or password",
                });
            }
            //User found
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASSWORD_SECRET
            ).toString(CryptoJS.enc.Utf8);
            if (hashedPassword !== req.body.password) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect username or password",
                });
            }
            const { password, ...returnUser } = user._doc;
            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SECRET,
                { expiresIn: "3d" }
            );
            return res
                .status(200)
                .json({ success: true, user: { ...returnUser, accessToken } });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}
module.exports = new AuthController();
