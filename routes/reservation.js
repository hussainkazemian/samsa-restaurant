//routes/reservation.js
// routes/reservation.js
const express = require("express");
const db = require("../data/db");
const router = express.Router();

// Handle GET request to display the reservation form
router.get("/", (req, res) => {
    res.render("reservation/reservation", {
        user: req.session.user || null,
        title: "Reservation",
        reservations: req.reservations || [], // Dynamically fetched reservations
    });
});

// Handle reservation submission
router.post("/", async (req, res) => {
    const { fullname, email, num_adults, num_children, date, time, comment } = req.body;

    try {
        const userId = req.session.user ? req.session.user.id : null;
        const reservationTime = `${date} ${time}`;

        const adultsCount = parseInt(num_adults, 10);
        const childrenCount = num_children ? parseInt(num_children, 10) : null;

        if (isNaN(adultsCount)) {
            return res.status(400).send("Number of adults is required and must be a valid number.");
        }

        await db.execute(
            `INSERT INTO reservations (user_id, fullname, email, num_adults, num_children, reservation_time, comment)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, fullname, email, adultsCount, childrenCount, reservationTime, comment || null]
        );

        req.session.reservationSuccess = `Dear ${fullname}, your reservation is confirmed for ${date} at ${time}.`;
        res.redirect("/reservation/success");
    } catch (error) {
        console.error("Error during reservation:", error);
        res.status(500).send("An error occurred. Please try again.");
    }
});

// Render reservation success page
router.get("/success", (req, res) => {
    const message = req.session.reservationSuccess || "Reservation completed.";
    req.session.reservationSuccess = null;
    res.render("reservation/success", { message, user: req.session.user || null });
});

module.exports = router;