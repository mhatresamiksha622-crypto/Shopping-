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

    // Find the clicked product button
    const buttons = document.querySelectorAll(".add-btn");

    buttons.forEach(button => {
        const onclickValue = button.getAttribute("onclick");

        if (onclickValue === `addToCart(${id})`) {
            const originalText = button.textContent;

            button.classList.add("added");
            button.textContent = "Added Successfully!";

            setTimeout(() => {
                button.classList.remove("added");
                button.textContent = originalText;
            }, 1500);
        }
    });

    showMessage("💗 " + product.name + " added to your bag!");
}
