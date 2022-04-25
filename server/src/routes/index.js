const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const cartRoute = require("./cartRoute");
const orderRoute = require("./orderRoute");
const stripeRoute = require("./stripeRoute");
function route(app) {
    app.use("/api/checkout", stripeRoute);
    app.use("/api/orders", orderRoute);
    app.use("/api/carts", cartRoute);
    app.use("/api/products", productRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/", (req, res) => res.send("Hello world!"));
}
module.exports = route;
