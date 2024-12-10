# Samsa Restaurant App

## Features

### User Management
- **Registration**: Allow users to create accounts.
- **Login and Logout**: Secure user authentication.
- **Password Reset**: Users can reset forgotten passwords.

### Menu and Products
- **Fetch All Menus and Products**: Retrieve and display all available menus and products.
- **Product Details**: View detailed information about each product.

### Reservation System
- **Create Reservations**: Users can book reservations.
- **View Reservation History**: Access a history of all past reservations.

### Shopping Cart
- **Add to Cart**: Add products to a shopping cart.
- **Checkout and Payment**: Seamless checkout and payment process.

### Admin Management
- **Create, Update, and Delete Products**: Manage the product catalog.

### Database Integration
- **MySQL**: Ensures robust data persistence.

## Installation

### Clone Repository
Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/username/samsa-restaurant-app.git
cd samsa-restaurant-app
```

### Install Dependencies
Install the required dependencies:

```bash
npm install
```

### Prerequisites
- **Node.js** (v16+)
- **MySQL Server**
- **Code Editor** (e.g., Visual Studio Code)

### Database Setup
1. Import the database schema:

   ```bash
   mysql -u root -p samsa_restaurant_app < export-db.sql
   ```

2. Update the `config.js` file with your MySQL credentials if necessary.

### Run the Application
Start the server:

```bash
node index.js
```

Access the application at [http://localhost:3000](http://localhost:3000).

### Optional Dependency
To enable email functionality:

```bash
npm install @sendgrid/mail
```

## Functionalities Overview

### Authentication
- **User Login**: Secure login functionality for users.
- **User Registration**: New users can register for an account.
- **Password Reset**: Allows users to reset their passwords securely.

### Reservation
- **View Reservation Form**: Users can access the reservation form.
- **Submit Reservation**: Submit reservation requests for processing.
- **Display Recent Reservations**: View a list of recent reservations made by the user.

### Products
- **View All Products**: Display a comprehensive list of all available products.
- **View Products by Menu**: Filter and display products based on menu categories.
- **View Product Details**: Detailed view of product descriptions, images, and specifications.

### Cart
- **Add Items to Cart**: Add selected products to the shopping cart.
- **View Cart**: Display all items added to the cart with the ability to modify quantities or remove items.
- **Payment and Confirmation**: Proceed to checkout and confirm payment for the items in the cart.

### Admin Management
- **Product Creation**: Add new products to the system.
- **Product Editing**: Edit details of existing products.
- **Product List**: View and manage the list of all products.

## API Endpoints and Descriptions

### Authentication
| Method | Endpoint           | Description                   |
|--------|--------------------|-------------------------------|
| GET    | /login             | Displays login form.          |
| POST   | /login             | Authenticates user.           |
| GET    | /register          | Displays registration form.   |
| POST   | /register          | Registers a new user.         |
| GET    | /forgot-password   | Displays reset form.          |
| POST   | /forgot-password   | Sends reset link.             |
| POST   | /reset-password    | Resets user password.         |

### Products
| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| GET    | /products              | Lists all products.           |
| GET    | /products/menu/:id     | Lists products by menu.       |
| GET    | /products/:id          | Displays product details.     |

### Reservation
| Method | Endpoint                 | Description                   |
|--------|--------------------------|-------------------------------|
| GET    | /reservation             | Displays reservation form.    |
| POST   | /reservation             | Submits a reservation.        |
| GET    | /reservation/success     | Displays success confirmation.|

### Cart
| Method | Endpoint       | Description                   |
|--------|----------------|-------------------------------|
| GET    | /cart          | Displays cart items.          |
| POST   | /cart/add      | Adds an item to the cart.     |
| POST   | /cart/payment  | Processes payment.            |

### Admin
| Method | Endpoint                 | Description                   |
|--------|--------------------------|-------------------------------|
| GET    | /admin/product/create    | Displays product creation.    |
| GET    | /admin/product/:id       | Displays product edit form.   |
| GET    | /admin/products          | Lists all products.           |
