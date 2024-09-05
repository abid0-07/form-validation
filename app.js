document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function(event) {
        // Prevent form submission
        event.preventDefault();
        
        // Clear previous error messages
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(msg => msg.remove());

        // Validate fields
        let isValid = true;

        // Validate Name of Owner
        const ownerName = document.getElementById("ownerName").value.trim();
        if (ownerName === "") {
            showError("ownerName", "Name of Owner is required.");
            isValid = false;
        }

        // Validate Date of Birth
        const dob = document.getElementById("dob").value;
        if (dob === "") {
            showError("dob", "Date of Birth is required.");
            isValid = false;
        } else {
            const birthDate = new Date(dob);
            const today = new Date();
            if (birthDate >= today) {
                showError("dob", "Date of Birth must be in the past.");
                isValid = false;
            }
        }

        // Validate Phone Number
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const phoneRegex = /^[0-9]*$/; // Only digits
        if (phoneNumber === "") {
            showError("phoneNumber", "Phone Number is required.");
            isValid = false;
        } else if (!phoneRegex.test(phoneNumber)) {
            showError("phoneNumber", "Phone Number must contain only digits.");
            isValid = false;
        }

        // If the form is valid, submit it
        if (isValid) {
            form.submit();
        }
    });

    function showError(inputId, message) {
        const inputField = document.getElementById(inputId);
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.style.color = "red";
        errorMessage.textContent = message;
        inputField.parentNode.insertBefore(errorMessage, inputField.nextSibling);
    }
});