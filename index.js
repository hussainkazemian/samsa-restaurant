// index.js

const express = require('express');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');
const app = express();

const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const reservationRoutes = require('./routes/reservation');
const passwordRoutes = require('./routes/password');

const fetchUserData = require("./shared/fetchUserData");

const secret = crypto.randomBytes(64).toString('hex');
console.log('Generated Secret Key:', secret); 

// Middleware to parse form data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware setup
app.use(
    session({
        secret: secret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set secure: true if using HTTPS
    })
);

// Set up view engine (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use("/libs", express.static("node_modules"));
app.use("/static", express.static("public"));

app.use(fetchUserData);

// Register routes
app.use(authRoutes);
app.use(userRoutes);
app.use('/reservation', reservationRoutes);
app.use(passwordRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);

// Home Route
app.get('/', (req, res) => {
    res.redirect('/products'); // Default landing page
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.listen(3000, function() {
    console.log("listening on port 3000");
});
