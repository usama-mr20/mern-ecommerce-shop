import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

// @desc fetch all products
// @route /api/products
// @access Public

router.get("/", (req, res) => {
  Product.find()
    .then((p) => {
      res.json(p);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// @desc fetch product by id
// @route /api/products/:id
// @access Public

router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((p) => {
      res.json(p);
    })
    .catch((err) => {
      res.status(404).send({ message: "Product Not Found" });
    });
});

export default router;
