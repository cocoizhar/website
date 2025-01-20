function confirmOrder() {
    // Retrieve form values
    var accName = document.getElementById('aname').value;
    var paymentMethod = document.querySelector('.paymentmethod').value;

    // Retrieve other form values for validation
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var conumber = document.getElementById('conumber').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var region = document.getElementById('region').value;

    // Check if any required field is empty
    if (accName === '' || paymentMethod === '' || fname === '' || lname === '' || email === '' || conumber === '' || address === '' || city === '' || region === '') {
        alert("Please fill in all the required fields.");
        return; // Prevent further execution
    }

    // Generate a randomized order number (you can use any logic you prefer)
    var orderNumber = generateOrderNumber();

    // Create the receipt HTML
    var receiptHtml = `
        <div class="receipt">
            <h3>Receipt <span class="check-mark">&#10004;</span></h3>
            <p>Account Name: ${accName}</p>
            <p>Payment Method: ${paymentMethod}</p>
            <p>Order Number: #${orderNumber}</p>
            <p>Thank you for buying, see you soon!</p>
        </div>
    `;

    // Display the receipt in a form or alert (you can customize this part)
    showReceipt(receiptHtml);
}

// Function to generate a random order number (you can customize this logic)
function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000) + 1;
}

// Function to display the receipt (you can customize this part)
function showReceipt(receiptHtml) {
    // Create a new div element
    var receiptContainer = document.createElement('div');

    // Set the innerHTML of the div element
    receiptContainer.innerHTML = receiptHtml;

    // Style the div (you can customize this part based on your styling preferences)
    receiptContainer.style.position = 'fixed';
    receiptContainer.style.top = '50%';
    receiptContainer.style.left = '50%';
    receiptContainer.style.transform = 'translate(-50%, -50%)';
    receiptContainer.style.backgroundColor = '#fff';
    receiptContainer.style.padding = '20px';
    receiptContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    
    // Append the receipt container to the body
    document.body.appendChild(receiptContainer);

    // Clear the stored cart items and total price in localStorage (if needed)
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartTotalPrice');

    // Redirect to the menu page after a delay (e.g., 3 seconds)
    setTimeout(function() {
        window.location.href = '2-menu.html'; // Replace '2-menu.html' with the actual URL of your menu page
    }, 3000); // Adjust the delay as needed (in milliseconds)
}

