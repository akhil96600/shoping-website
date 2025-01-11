// Cart Array to store products
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart functionality
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".cart");

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const product = document.querySelectorAll(".pro")[index];
            const productDetails = {
                id: index + 1,
                name: product.querySelector("h5").innerText,
                price: parseFloat(product.querySelector("h4").innerText.replace("$", "")),
                image: product.querySelector("img").src,
                quantity: 1,
            };

            const existingProduct = cart.find(item => item.id === productDetails.id);
            if (existingProduct) {
                existingProduct.quantity++;
                alert(`${productDetails.name} quantity increased!`);
            } else {
                cart.push(productDetails);
                alert(`${productDetails.name} added to cart!`);
            }

            // Save to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
        });
    });
});
