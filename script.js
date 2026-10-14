const products = [
    { id: 1, name: "Velvet Lipstick", price: 199 },
    { id: 2, name: "Liquid Foundation", price: 349 },
    { id: 3, name: "Black Kajal", price: 99 },
    { id: 4, name: "Rose Pink Blush", price: 249 },
    { id: 5, name: "Black Eyeliner", price: 149 }
];

let cart = [];

function shopNow() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty 💗";
        totalElement.textContent = "0";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove ✖
            </button>
        </div>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    totalElement.textContent = total;
}
