//admin.js
const express = require("express");
const router = express.Router();

// Admin product creation page
router.get("/product/create", (req, res) => {
    res.render("admin/product-create");
});

// Admin product edit page
router.get("/product/:productid", (req, res) => {
    res.render("admin/product-edit");
});

// Admin product list page
router.get("/products", (req, res) => {
    res.render("admin/product-list");
});

module.exports = router;