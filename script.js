let total = 0;
let count = 0;

function addItem(price) {
    total += price;
    count++;

    document.getElementById("count").textContent = count;
    document.getElementById("total").textContent = total;

    let discount = total >= 500 ? total * 0.10 : 0;

    document.getElementById("discount").textContent = discount;
    document.getElementById("final").textContent = total - discount;

    document.getElementById("message").textContent =
        "Product added to cart successfully!";
}

function checkout() {
    if (count === 0) {
        document.getElementById("message").textContent =
            "Please add products first!";
        return;
    }

    let discount = total >= 500 ? total * 0.10 : 0;

    document.getElementById("message").textContent =
        "Order placed successfully! Final Bill: ₹" +
        (total - discount);
}

function resetCart() {
    total = 0;
    count = 0;

    document.getElementById("count").textContent = 0;
    document.getElementById("total").textContent = 0;
    document.getElementById("discount").textContent = 0;
    document.getElementById("final").textContent = 0;
    document.getElementById("message").textContent =
        "Cart has been reset!";
}
