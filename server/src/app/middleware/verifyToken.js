const jwt = require("jsonwebtoken");

//Authorization: Bearer asdjasjdhashdasdka
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader && authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Access token is not valid",
                });
            }
            req.user = user;
            next();
        });
    } else {
        return res
            .status(401)
            .json({ success: false, message: "Access token not found" });
    }
};
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to do that!",
            });
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to do that!",
            });
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
};
