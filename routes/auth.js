const express = require("express");
const router = express.Router();
const db = require("../data/db");
const bcrypt = require("bcrypt");

// Render Login page
router.get("/login", (req, res) => {
    const registrationSuccess = req.session.registrationSuccess || null;
    req.session.registrationSuccess = null; // Clear the message after displaying

    res.render("auth/login", {
        title: "Login",
        registrationSuccess,
    });
});

// Render Register page
router.get("/register", (req, res) => {
    res.render("auth/register", {
        title: "Register",
    });
});

// Handle Register form submission
router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if username or email already exists
        const [existingUsers] = await db.execute(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email]
        );
        if (existingUsers.length > 0) {
            return res.send("Username or email already exists.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await db.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        // Store the success message in session
        req.session.registrationSuccess = `Hey ${username}, you are successfully registered! Please login to your account.`;

        // Redirect to the login page
        res.redirect("/login");
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("An error occurred. Please try again later.");
    }
});

// Handle Login form submission
router.post("/login", async (req, res) => {
    const { userIdentifier, password } = req.body;

    try {
        // Find the user by username or email
        const [users] = await db.execute(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [userIdentifier, userIdentifier]
        );

        if (users.length === 0) {
            return res.send("Invalid username/email or password.");
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send("Invalid username/email or password.");
        }

        // Save user information in the session
        req.session.user = { id: user.id, username: user.username };

        // Fetch user reservations and cart items from the database
        const [reservations] = await db.execute(
            `SELECT
                DATE_FORMAT(reservation_time, '%Y-%m-%d') AS date,
                DATE_FORMAT(reservation_time, '%H:%i') AS time,
                COALESCE(num_adults, 0) AS num_adults,
                COALESCE(num_children, 0) AS num_children,
                comment
             FROM reservations
             WHERE user_id = ?
             ORDER BY reservation_time DESC`,
            [user.id]
        )
        const [cartItems] = await db.execute("SELECT * FROM cart_items WHERE user_id = ?", [user.id]);

        // Store reservations and cart items in the session
        req.session.reservations = reservations;
        req.session.cartItems = cartItems;

        // Fetch menus and products for the products page
        const [menus] = await db.execute("SELECT * FROM menu");
        const [products] = await db.execute("SELECT * FROM product WHERE approval = 1");

        res.render("users/products", {
            user: req.session.user,
            menus,
            products,
            reservations,
            cartItems,
            selectedMenu: null,
            title: `Welcome back, ${user.username}`,
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("An error occurred. Please try again later.");
    }
});

// Logout Route
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

// Home route - renders the home page
router.get("/", async (req, res) => {
    try {
        const [menus] = await db.execute("SELECT * FROM menu");
        const [products] = await db.execute("SELECT * FROM product WHERE approval=1 AND homepage=1");

        res.render("users/index", {
            user: req.session.user || null, // Pass the user session or null if not logged in
            menus,
            products,
            selectedMenu: null,
            title: "Welcome to Samsa Restaurant",
        });
    } catch (err) {
        console.error("Error fetching data for index page:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
