const express = require('express');
const router = express.Router();
const db = require("../data/db");

// Middleware to ensure the cart is initialized in the session
function checkCart(req, res, next) {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
}

// Apply middleware to initialize the cart
router.use(checkCart);

// GET /cart - Display the shopping cart
// GET /cart - Display the shopping cart
router.get("/", async (req, res) => {
    let cartItems = [];
    let totalPrice = 0;

    try {
        if (req.session.user) {
            // Fetch cart items for logged-in users
            const [dbCartItems] = await db.execute(
                "SELECT product_id, product_name, quantity, total_price FROM cart_items WHERE user_id = ?",
                [req.session.user.id]
            );
            cartItems = dbCartItems.map(item => ({
                ...item,
                total_price: parseFloat(item.total_price), // Ensure total_price is numeric
            }));
            totalPrice = cartItems.reduce((sum, item) => sum + item.total_price, 0);
        } else {
            // Use session cart for non-logged-in users
            cartItems = req.session.cart || [];
            totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }

        // Pass reservations dynamically fetched via middleware (fetchUserData)
        res.render("cart/cart", {
            user: req.session.user || null,
            items: cartItems,
            reservations: req.reservations || [], // Include reservations in the cart view
            totalPrice,
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send("An error occurred while loading the cart.");
    }
});


// POST /cart/add - Add item to the cart
router.post('/add', async (req, res) => {
    const { product_id, product_name, price, quantity } = req.body;

    if (!product_id || !product_name || !price || !quantity) {
        return res.status(400).send({ message: 'Product ID, name, price, and quantity are required.' });
    }

    try {
        if (req.session.user) {
            // If user is logged in, save the cart item to the database
            await db.execute(
                `INSERT INTO cart_items 
                 (user_id, product_id, product_name, quantity, total_price) 
                 VALUES (?, ?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE 
                 quantity = quantity + ?, 
                 total_price = total_price + ?`,
                [
                    req.session.user.id,
                    product_id,
                    product_name,
                    parseInt(quantity),
                    parseFloat(price) * parseInt(quantity),
                    parseInt(quantity),
                    parseFloat(price) * parseInt(quantity),
                ]
            );
        } else {
            // Use session cart for non-logged-in users
            const existingItem = req.session.cart.find((item) => item.id === product_id);

            if (existingItem) {
                existingItem.quantity += parseInt(quantity);
                existingItem.total_price = existingItem.price * existingItem.quantity;
            } else {
                req.session.cart.push({
                    id: product_id,
                    name: product_name,
                    price: parseFloat(price),
                    quantity: parseInt(quantity),
                    total_price: parseFloat(price) * parseInt(quantity),
                });
            }
        }

        res.send({ message: 'Item added to cart', cart: req.session.cart });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).send({ message: "An error occurred while adding the item to the cart." });
    }
});

// POST /cart/payment - Process payment and clear the cart
router.post('/payment', async (req, res) => {
    const { name, address, card } = req.body;

    if (!name || !address || !card) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const items = req.session.user
            ? await db.execute("SELECT * FROM cart_items WHERE user_id = ?", [req.session.user.id]).then(([rows]) => rows)
            : req.session.cart;

        const totalPrice = items.reduce((sum, item) => sum + (item.total_price || item.price * item.quantity), 0);

        if (req.session.user) {
            // Clear cart in the database
            await db.execute("DELETE FROM cart_items WHERE user_id = ?", [req.session.user.id]);
        } else {
            // Clear session cart
            req.session.cart = [];
        }

        res.render('cart/confirmation', {
            user: req.session.user || null,
            name,
            address,
            items,
            totalPrice,
            title: 'Payment Confirmation',
        });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).send("An error occurred while processing your payment.");
    }
});

module.exports = router;
