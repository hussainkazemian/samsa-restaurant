// routes/reservation.js
const express = require('express');
const router = express.Router();
const db = require('../data/db');

// Render the reservation form
router.get('/', (req, res) => {
    res.render('reservation/reservation', { title: 'Reservation' });
});

// Handle reservation submission
router.post('/', async (req, res) => {
    const { fullname, email, num_adults, num_children, reservation_time, comment } = req.body;

    try {
        // Insert reservation data into the database
        await db.execute(
            'INSERT INTO reservations (fullname, email, num_adults, num_children, reservation_time, comment) VALUES (?, ?, ?, ?, ?, ?)',
            [fullname, email, num_adults, num_children, reservation_time, comment]
        );

        res.redirect('/?message=reservation-success');
    } catch (err) {
        console.error('Error creating reservation:', err);
        res.status(500).send('An error occurred while processing your reservation.');
    }
});

module.exports = router;
