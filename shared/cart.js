// shared/cart.js

let cart = [];


function addToCart(product) {
    cart.push(product);
}

function getCart() {
    return cart;
}

function clearCart() {
    cart = [];
}

module.exports = { addToCart, getCart, clearCart };