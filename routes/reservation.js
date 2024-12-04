const express = require("express");
const db = require("../data/db");
const router = express.Router();

// Render reservation form
router.get("/", (req, res) => {
    const user = req.session.user || null; // Safely access session
    res.render("reservation/reservation", {
        user,
        title: "Reservation",
    });
});

router.post("/", async (req, res) => {
    const { fullname, email, num_adults, num_children, date, time, comment } = req.body;

    try {
        const userId = req.session.user ? req.session.user.id : null; // Check if user is logged in
        const reservationTime = `${date} ${time}`; // Combine date and time

        // Set num_children to null if it's not provided
        const childrenCount = num_children && num_children.trim() !== "" ? parseInt(num_children, 10) : null;

        // Insert reservation into the database
        await db.execute(
            "INSERT INTO reservations (user_id, fullname, email, num_adults, num_children, reservation_time, comment) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                userId,
                fullname,
                email,
                parseInt(num_adults, 10), // Ensure number of adults is an integer
                childrenCount, // Handle optional children
                reservationTime,
                comment || null, // Handle optional comment
            ]
        );

        // Store success message in session
        req.session.reservationSuccess = userId
            ? `Hello ${req.session.user.username}, your reservation is confirmed for ${date} at ${time}.`
            : `Thank you for your reservation! We look forward to seeing you on ${date} at ${time}.`;

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
