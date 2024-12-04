// routes/password.js

const express = require('express');
const crypto = require('crypto');
const db = require('../data/db');
const bcrypt = require('bcrypt');
const nodemailer = require('@sendgrid/mail');

const router = express.Router();
nodemailer.setApiKey(process.env.SENDGRID_API_KEY);

// Render forgot password form
router.get('/forgot-password', (req, res) => {
    res.render('auth/forgot-password', { title: 'Forgot Password' });
});

// Handle forgot password submission
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.send('No user found with this email.');

        const user = users[0];
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

        await db.execute('INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)', [
            user.id,
            token,
            expiresAt,
        ]);

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;
        await nodemailer.send({
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });

        res.send('Password reset email sent.');
    } catch (err) {
        console.error('Error during forgot password:', err);
        res.status(500).send('An error occurred. Please try again.');
    }
});

// Render reset password form
router.get('/reset-password', async (req, res) => {
    const { token } = req.query;

    try {
        const [tokens] = await db.execute('SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()', [
            token,
        ]);

        if (tokens.length === 0) return res.send('Invalid or expired token.');

        res.render('auth/reset-password', { title: 'Reset Password', token });
    } catch (err) {
        console.error('Error during reset password:', err);
        res.status(500).send('An error occurred. Please try again.');
    }
});

// Handle reset password submission
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        const [tokens] = await db.execute('SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()', [
            token,
        ]);

        if (tokens.length === 0) return res.send('Invalid or expired token.');

        const reset = tokens[0];
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, reset.user_id]);
        await db.execute('DELETE FROM password_resets WHERE token = ?', [token]);

        res.redirect('/login?message=password-reset-success');
    } catch (err) {
        console.error('Error during password reset:', err);
        res.status(500).send('An error occurred. Please try again.');
    }
});

module.exports = router;
