
//CART FEATURES
   var cartFormTimeout;
    document.addEventListener('DOMContentLoaded', function() {
        loadCartItems();
        // loadTotalPrice();
        updateCartTotal(); // Update the total based on the loaded items
    });


    function showCartForm() {
        clearTimeout(cartFormTimeout);
        document.getElementById('cartForm').style.display = 'block';
    }

    function hideCartForm() {
        cartFormTimeout = setTimeout(function() {
            document.getElementById('cartForm').style.display = 'none';
        });
    }

    function cancelHide() {
        clearTimeout(cartFormTimeout);
    }


function checkCartAndProceed(event) {
    var cartItemsCount = document.querySelectorAll('.cart-item').length;

    if (cartItemsCount === 0) {
        alert("Your cart is empty. Please add items to proceed.");
        event.preventDefault(); // Prevent the default action of the anchor tag
    }
}


function createCartItemElement(name, numericPrice, imageUrl, itemId) {
    var newItem = document.createElement('div');
    newItem.className = 'cart-item';
    newItem.setAttribute('data-item-id', itemId);

    newItem.innerHTML = `
        <span class="close-btn" onclick="removeCartItem(this.parentNode)">X</span>
        <img src="${imageUrl}" alt="${name}">
        <div class="cart-item-info">
            <h4>${name}</h4>
            <p>Price: ₱${numericPrice.toFixed(2)}</p>
            <label class="quantity-label">Quantity: <span class="quantity">1</span></label>
        </div>
    `;

    return newItem;
}


function addToCart(name, price, imageUrl, itemId) {
    var numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));

    var cartItemsContainer = document.getElementById('cartItems');
    var existingItem = document.querySelector(`.cart-item[data-item-id="${itemId}"]`);

    if (existingItem) {
        var quantityElement = existingItem.querySelector('.quantity');
        quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    } else {
        var newItem = createCartItemElement(name, numericPrice, imageUrl, itemId);
        cartItemsContainer.appendChild(newItem);
    }

    // Update the cart total after the cart is modified
    updateCartTotal();
    saveCartItems();
}


function removeCartItem(item) {
    var quantityElement = item.querySelector('.quantity');
    var currentQuantity = parseInt(quantityElement.textContent, 10);
    
    if (currentQuantity > 1) {
        // Decrease the quantity if greater than 1
        quantityElement.textContent = (currentQuantity - 1).toString();
    } else {
        // Remove the item if the quantity is 1
        item.parentNode.removeChild(item);
    }
    updateCartTotal();
    saveCartItems();
}


function updateCartTotal() {
    var cartItems = document.querySelectorAll('.cart-item');
    var totalPrice = 0;

    cartItems.forEach(function (cartItem) {
        var quantity = parseInt(cartItem.querySelector('.quantity').textContent, 10);
        var price = parseFloat(cartItem.querySelector('.cart-item-info p').textContent.replace(/[^\d.]/g, ''));

        totalPrice += quantity * price;
    });

    var shippingFee = 70.00;
    var totalFee = totalPrice + shippingFee;

    // // Update the total price in the HTML
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    document.getElementById('totalFee').textContent = totalFee.toFixed(2);

    // Store the total price in localStorage
    localStorage.setItem('cartTotalPrice', totalPrice.toFixed(2));
    }


    function saveCartItems() {
    var cartItems = document.getElementById('cartItems').innerHTML;
    localStorage.setItem('cartItems', cartItems);

    // Also save the total price
    var totalPrice = document.getElementById('totalPrice').textContent;
    localStorage.setItem('cartTotalPrice', totalPrice);
    }


function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    var cartItemsContainer = document.getElementById('cartItems');

    if (cartItems) {
        cartItemsContainer.innerHTML = cartItems;
    } else {
        // If cart is empty, show an empty cart image with text
        var emptyCartContainer = document.createElement('div');
        emptyCartContainer.className = 'empty-cart-container';

        var emptyCartImage = document.createElement('img');
        emptyCartImage.src = 'empty-cart-image.png'; // Replace with the path to your empty cart image
        emptyCartImage.alt = 'Empty Cart';
        emptyCartContainer.appendChild(emptyCartImage);


        // Apply styling to the container, image, and text
        emptyCartContainer.style.textAlign = 'center';
        emptyCartImage.style.width = '700px'; // Adjust the width as needed
        emptyCartImage.style.display = 'block';
        emptyCartImage.style.margin = '0 auto'; // Center the image


        cartItemsContainer.appendChild(emptyCartContainer);
    }

    // Load the total price
    var totalPrice = localStorage.getItem('cartTotalPrice');
    if (totalPrice) {
        document.getElementById('totalPrice').textContent = totalPrice;

        // Also update the shipping fee and total payment
        var shippingFee = 70.00;
        var totalFee = parseFloat(totalPrice) + shippingFee;

        document.getElementById('totalFee').textContent = totalFee.toFixed(2);
    }
}


