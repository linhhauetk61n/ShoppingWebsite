const Product = require("../models/Products");

class ProductController {
    //create
    async create(req, res) {
        const newProduct = new Product(req.body);
        try {
            const savedProduct = await newProduct.save();
            return res.status(200).json({ success: true, savedProduct });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //update
    async update(req, res) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                message: "Product has been updated",
                updatedProduct,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //delete
    async delete(req, res) {
        try {
            await Product.findByIdAndDelete(req.params.id);
            return res
                .status(200)
                .json({ success: true, message: "Product has been deleted" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //Get product by id
    async get(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            return res.status(200).json({ success: true, product });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    //get All products
    async getAll(req, res) {
        const queryNew = req.query.new;
        const queryCategory = req.query.category;
        try {
            let products;
            if (queryNew) {
                products = await Product.find()
                    .sort({ createdAt: -1 })
                    .limit(5);
            } else if (queryCategory) {
                products = await Product.find({
                    categories: {
                        $in: [queryCategory],
                    },
                });
            } else {
                products = await Product.find();
            }

            return res.status(200).json({ success: true, products });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
}

module.exports = new ProductController();
