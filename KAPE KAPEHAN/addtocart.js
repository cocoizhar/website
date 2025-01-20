   var cartFormTimeout;


    document.addEventListener('DOMContentLoaded', function() {
        loadCartItems();
    });

    function showCartForm() {
        clearTimeout(cartFormTimeout);
        document.getElementById('cartForm').style.display = 'block';
    }

    function hideCartForm() {
        cartFormTimeout = setTimeout(function() {
            document.getElementById('cartForm').style.display = 'none';
        }, 500);
    }

    function cancelHide() {
        clearTimeout(cartFormTimeout);
    }

    function removeCartItem(item) {
        item.parentNode.removeChild(item);
        saveCartItems();
    }

    function addToCart(name, price, imageUrl, itemId) {
        var cartItemsContainer = document.getElementById('cartItems');
        var existingItem = document.querySelector(`.cart-item[data-item-id="${itemId}"]`);
        
        if (existingItem) {

            var quantityElement = existingItem.querySelector('.quantity');
            quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
        } else {

            var newItem = document.createElement('div');
            newItem.className = 'cart-item';
            newItem.setAttribute('data-item-id', itemId);

   
            newItem.innerHTML = `
                <span class="close-btn" onclick="removeCartItem(this.parentNode)">X</span>
                <img src="${imageUrl}" alt="${name}">
                <div class="cart-item-info">
                    <h4>${name}</h4>
                    <p>Price: ${price}</p>
                    <label class="quantity-label">Quantity: <span class="quantity">1</span></label>
                </div>
            `;
            
            cartItemsContainer.appendChild(newItem);
        }

        saveCartItems();
    }

    function saveCartItems() {
        var cartItems = document.getElementById('cartItems').innerHTML;
        localStorage.setItem('cartItems', cartItems);
    }

    function loadCartItems() {
        var cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
            document.getElementById('cartItems').innerHTML = cartItems;
        }
    }