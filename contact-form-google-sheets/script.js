// link
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwwPy1aMLGgXW0WDBW6I7HzubPHJA2xIwnEb-NOgrDC9v7WE97oEytnGdPzliRm6x9z7w/exec';

// form elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// Validation functions
function validateName() {
  const name = nameInput.value.trim();
  if (name.length < 2) {
    nameError.textContent = "Name must be at least 2 characters.";
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const gmailRegex = /^[^@]+@gmail\.com$/;
  if (!gmailRegex.test(email)) {
    emailError.textContent = "Please enter a valid @gmail.com email.";
    return false;
  }
  emailError.textContent = "";
  return true;
}

function validateMessage() {
  const message = messageInput.value.trim();
  if (message.length < 10) {
    messageError.textContent = "Message must be at least 10 characters.";
    return false;
  }
  messageError.textContent = "";
  return true;
}

// Real-time validation 
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

// Form submit event
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Stop form from submitting normally

  // Run all validations
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    // Prepare data to send
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    };

    // Send data to Google Apps Script Web App
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(function() {
      formSuccess.textContent = "Your message has been sent!";
      form.reset();
      setTimeout(function() {
        formSuccess.textContent = "";
      }, 4000);
    })
    .catch(function() {
      formSuccess.textContent = "There was an error. Please try again.";
    });
  }
});
