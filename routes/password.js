// routes/password.js

const express = require('express');
const db = require('../data/db'); // Adjust this path if necessary
const router = express.Router();

// Render forgot password form
router.get('/forgot-password', (req, res) => {
    res.render('auth/forgot-password', { title: 'Forgot Password' });
});

// Handle forgot password submission
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists (this can also be removed if you want it completely fake)
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        // Logically, we proceed regardless of whether the email exists or not
        if (users.length === 0) {
            // Simulate a positive response
            return res.send('<script>alert("A reset link has been sent to your email address."); window.location="/login";</script>');
        }

        // Simulate success even if the email exists
        res.send('<script>alert("A reset link has been sent to your email address."); window.location="/login";</script>');
    } catch (err) {
        console.error('Error during forgot password:', err);
        res.status(500).send('<script>alert("An error occurred. Please try again."); window.location="/forgot-password";</script>');
    }
});

module.exports = router;