document.addEventListener("DOMContentLoaded", () => {
    const cartBody = document.getElementById("cart-body");
    const cartTotal = document.getElementById("cart-total");

    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Display Cart Items
    const updateCart = () => {
        cartBody.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const subtotal = (item.price * item.quantity).toFixed(2);
            total += parseFloat(subtotal);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="80"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                    ${item.quantity}
                    <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                </td>
                <td>$${subtotal}</td>
                <td><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>
            `;
            cartBody.appendChild(row);
        });

        cartTotal.innerText = `$${total.toFixed(2)}`;
    };

    // Increase Quantity
    window.increaseQuantity = (index) => {
        cart[index].quantity++;
        saveAndUpdateCart();
    };

    // Decrease Quantity
    window.decreaseQuantity = (index) => {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            saveAndUpdateCart();
        } else {
            alert("Minimum quantity is 1");
        }
    };

    // Remove Item
    window.removeItem = (index) => {
        cart.splice(index, 1);
        saveAndUpdateCart();
    };

    // Save Cart to LocalStorage and Update UI
    const saveAndUpdateCart = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    };

    // Initial Load
    updateCart();
});
