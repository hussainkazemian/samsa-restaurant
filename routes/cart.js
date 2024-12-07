//cart.js

const express = require('express');
const router = express.Router();
const db = require("../data/db");

function checkCart(req, res, next) {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
}

router.use(checkCart);

router.get("/", async (req, res) => {
    try {
        let cartItems = [];
        let totalPrice = 0;

        if (req.session.user) {
            // Fetch cart items from the database for the logged-in user
            const [dbCartItems] = await db.execute(
                `SELECT product_id, product_name, quantity, total_price 
                 FROM cart_items 
                 WHERE user_id = ?`,
                [req.session.user.id]
            );

            cartItems = dbCartItems.map(item => ({
                id: item.product_id,
                name: item.product_name,
                quantity: item.quantity,
                total_price: parseFloat(item.total_price),
            }));

            totalPrice = cartItems.reduce((sum, item) => sum + item.total_price, 0);

        } else {
            // Fetch cart items from the session for guest users
            cartItems = req.session.cart || [];
            totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }

        res.render("cart/cart", {
            user: req.session.user || null,
            items: cartItems,
            totalPrice,
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send("An error occurred while loading the cart.");
    }
});


router.post('/add', async (req, res) => {
    const { product_id, product_name, price, quantity } = req.body;

    if (!product_id || !product_name || !price || !quantity) {
        return res.status(400).send({ message: 'Product ID, name, price, and quantity are required.' });
    }

    try {
        if (req.session.user) {
            // If the user is logged in, add the item to the database
            const userId = req.session.user.id;
            
            await db.execute(
                `INSERT INTO cart_items (user_id, product_id, product_name, quantity, total_price)
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                    quantity = quantity + VALUES(quantity),
                    total_price = total_price + VALUES(total_price)`,
                [
                    userId,
                    product_id,
                    product_name,
                    parseInt(quantity),
                    parseFloat(price) * parseInt(quantity)
                ]
            );

        } else {
            // If the user is not logged in, add the item to the session cart
            const existingItem = req.session.cart.find(item => item.id === product_id);

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

        res.send({ message: 'Item added to cart successfully.' });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).send({ message: "An error occurred while adding the item to the cart." });
    }
});


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
            await db.execute("DELETE FROM cart_items WHERE user_id = ?", [req.session.user.id]);
        } else {
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