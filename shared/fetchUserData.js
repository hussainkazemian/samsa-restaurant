// middleware/fetchUserData.js
const db = require("../data/db");

async function fetchUserData(req, res, next) {
    if (req.session.user) {
        try {
            // Fetch reservations for the logged-in user
            const [reservations] = await db.execute(
                `SELECT 
                    DATE_FORMAT(reservation_time, '%Y-%m-%d') AS date,
                    DATE_FORMAT(reservation_time, '%H:%i') AS time,
                    num_adults,
                    IFNULL(num_children, 0) AS num_children,
                    comment
                FROM reservations
                WHERE user_id = ?
                ORDER BY reservation_time DESC`,
                [req.session.user.id]
            );

            // Fetch cart items for the logged-in user
            const [cartItems] = await db.execute(
                `SELECT 
                    product_name, 
                    quantity, 
                    total_price 
                FROM cart_items 
                WHERE user_id = ?`,
                [req.session.user.id]
            );

            req.session.reservations = reservations;
            req.session.cartItems = cartItems;
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    }

    next();
}

module.exports = fetchUserData;
