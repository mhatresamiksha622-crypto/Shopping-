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

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    renderCart();
    showMessage(product.name + " added to your bag! 💗");
}

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    renderCart();
}

function removeFromCart(id) {
    const item = cart.find(product => product.id === id);
    if (!item) return;

    cart = cart.filter(product => product.id !== id);

    renderCart();
    showMessage(item.name + " removed from your bag.");
}

function clearCart() {
    cart = [];

    renderCart();
    showMessage("Your shopping bag has been cleared.");
}

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");
    const countElement = document.getElementById("cartCount");

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    countElement.textContent = totalQuantity;
    totalElement.textContent = totalPrice;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🛍️</span>
                <p>Your bag is waiting for some beauty!</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <div class="item-name">${item.name}</div>
                <div class="item-info">
                    ₹${item.price} each · Subtotal ₹${item.price * item.quantity}
                </div>

                <div class="quantity-controls">
                    <button onclick="changeQuantity(${item.id}, -1)"
                            aria-label="Decrease quantity">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)"
                            aria-label="Increase quantity">+</button>
                </div>
            </div>

            <button class="remove-btn"
                    onclick="removeFromCart(${item.id})">
                Remove ✖
            </button>
        </div>
    `).join("");
}

function showMessage(message) {
    const messageElement = document.getElementById("message");

    messageElement.textContent = message;

    clearTimeout(showMessage.timer);

    showMessage.timer = setTimeout(() => {
        messageElement.textContent = "";
    }, 2500);
}

renderCart();
