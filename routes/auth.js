//auth.js
const express = require("express");
const router = express.Router();
const db = require("../data/db");
const bcrypt = require("bcrypt");
const passwordRoutes = require('./password');

router.use(passwordRoutes);

router.get("/login", (req, res) => {
    const registrationSuccess = req.session.registrationSuccess || null;
    req.session.registrationSuccess = null;

    res.render("auth/login", { title: "Login", registrationSuccess, errorMessage: null });
});

router.get("/register", (req, res) => {
    res.render("auth/register", { title: "Register" });
});

router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const [existingUsers] = await db.execute(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email]
        );
        if (existingUsers.length > 0) {
            return res.send("Username or email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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
// Handle user login
router.post("/login", async (req, res) => {
    const { userIdentifier, password } = req.body;

    try {
        const [users] = await db.execute(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [userIdentifier, userIdentifier]
        );

        if (users.length === 0) {
            // Invalid username/email
            return res.render("auth/login", { 
                title: "Login",
                errorMessage: "Invalid username/email or password.",
                registrationSuccess: null
            });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // Invalid password
            return res.render("auth/login", { 
                title: "Login",
                errorMessage: "Invalid username/email or password.",
                registrationSuccess: null
            });
        }

        // Set session data
        req.session.user = { id: user.id, username: user.username };

        // Redirect to the cart page or previous page
        res.redirect("/products");
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).render("auth/login", { 
            title: "Login",
            errorMessage: "An error occurred. Please try again later.",
            registrationSuccess: null
        });
    }
});


router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;