const express = require("express");
const db = require("../data/db");
const router = express.Router();

// Render reservation form
router.get("/", (req, res) => {
    const user = req.session.user || null;
    res.render("reservation/reservation", {
        user,
        title: "Reservation",
    });
});

// Handle reservation submission
router.post("/", async (req, res) => {
    const { fullname, email, num_adults, num_children, date, time, comment } = req.body;

    try {
        const userId = req.session.user ? req.session.user.id : null;
        const reservationTime = `${date} ${time}`;
        const childrenCount = num_children && num_children.trim() !== "" ? parseInt(num_children, 10) : null;

        await db.execute(
            "INSERT INTO reservations (user_id, fullname, email, num_adults, num_children, reservation_time, comment) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                userId,
                fullname,
                email,
                parseInt(num_adults, 10),
                childrenCount,
                reservationTime,
                comment || null,
            ]
        );

        req.session.reservationSuccess = `Dear ${fullname}, your reservation is confirmed for ${date} at ${time}. A summary of your reservation has been sent to your email address (${email}).`;

        res.redirect("/reservation/success");
    } catch (error) {
        console.error("Error during reservation:", error);
        res.status(500).send("An error occurred. Please try again.");
    }
});

// Render reservation success page
router.get("/success", (req, res) => {
    const message = req.session.reservationSuccess || "Reservation completed.";
    req.session.reservationSuccess = null; // Clear the message
    res.render("reservation/success", { message, user: req.session.user || null });
});

module.exports = router;
