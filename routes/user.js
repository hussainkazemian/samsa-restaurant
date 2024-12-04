const express = require("express");
const router = express.Router();

const db = require("../data/db");

// Middleware to ensure session data is initialized
router.use((req, res, next) => {
    if (!req.session.cart) req.session.cart = [];
    if (!req.session.reservations) req.session.reservations = [];
    next();
});

// Fetch products by menu ID
router.use("/products/menu/:menuid", async (req, res) => {
    const { menuid } = req.params;
    try {
        const [products] = await db.execute("SELECT * FROM product WHERE menuid = ? AND approval = 1", [menuid]);
        const [menus] = await db.execute("SELECT * FROM menu");

        res.render("users/products", {
            user: req.session.user || null,
            menus: menus,
            products: products,
            reservations: req.session.reservations || [],
            cartItems: req.session.cart || [],
            selectedMenu: menuid,
            title: "Menu Products",
        });
    } catch (err) {
        console.error("Error fetching products by menu:", err);
        res.status(500).send("Internal server error");
    }
});

// Fetch product details by product ID
router.use("/products/:productid", async (req, res) => {
    const { productid } = req.params;
    try {
        const [products] = await db.execute("SELECT * FROM product WHERE productid = ?", [productid]);
        const product = products[0];

        if (product) {
            return res.render("users/product-details", {
                title: product.productname,
                product: product,
                user: req.session.user || null,
            });
        }
        res.redirect("/"); // Redirect to homepage if product not found
    } catch (err) {
        console.error("Error fetching product details:", err);
        res.status(500).send("Internal server error");
    }
});

// Fetch all products
router.use("/products", async (req, res) => {
    try {
        const [products] = await db.execute("SELECT * FROM product WHERE approval = 1");
        const [menus] = await db.execute("SELECT * FROM menu");

        res.render("users/products", {
            user: req.session.user || null,
            menus: menus,
            products: products,
            reservations: req.session.reservations || [],
            cartItems: req.session.cart || [],
            selectedMenu: null,
            title: "All Products",
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal server error");
    }
});

// Home route
router.get("/", async (req, res) => {
    try {
        const [products] = await db.execute("SELECT * FROM product WHERE approval = 1 AND homepage = 1");
        const [menus] = await db.execute("SELECT * FROM menu");

        // Fetch reservations for the logged-in user
        if (req.session.user) {
            const [reservations] = await db.execute("SELECT * FROM reservations WHERE email = ?", [req.session.user.email]);
            req.session.reservations = reservations;
        }

        res.render("users/index", {
            user: req.session.user || null,
            menus: menus,
            products: products,
            reservations: req.session.reservations || [],
            cartItems: req.session.cart || [],
            selectedMenu: null,
            title: "Welcome to Samsa Restaurant",
        });
    } catch (error) {
        console.error("Error loading home page:", error);
        res.status(500).send("Internal server error");
    }
});

// Add item to cart
router.post("/cart/add", async (req, res) => {
    const { productId } = req.body;

    if (!productId) return res.status(400).send("Product ID is required");

    try {
        const [products] = await db.execute("SELECT * FROM product WHERE productid = ?", [productId]);
        const product = products[0];

        if (!product) return res.status(404).send("Product not found");

        const existingItem = req.session.cart.find((item) => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            req.session.cart.push({
                id: productId,
                name: product.productname,
                price: parseFloat(product.price), // Ensure price is a number
                quantity: 1,
            });
        }

        res.redirect("/cart");
    } catch (err) {
        console.error("Error adding product to cart:", err);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
