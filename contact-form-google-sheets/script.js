const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwwPy1aMLGgXW0WDBW6I7HzubPHJA2xIwnEb-NOgrDC9v7WE97oEytnGdPzliRm6x9z7w/exec';

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

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

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    };

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(function() {
      formSuccess.textContent = "Your message has been sent";
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
