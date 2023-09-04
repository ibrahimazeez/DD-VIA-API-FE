// import { baseUrl, apiKey } from './config.js'
import { config } from './variables.js';
import { showToast } from './toast.js';


// Get references to the input fields and the submit button
const publicKeyInput = document.getElementById('public-key');
const secretKeyInput = document.getElementById('secret-key');
const submitButton = document.getElementById('submit-button');

// Add an event listener to the input fields
publicKeyInput.addEventListener('input', validateForm);
secretKeyInput.addEventListener('input', validateForm);

// Function to validate the form and enable/disable the submit button
function validateForm() {
  const publicKey = publicKeyInput.value.trim();
  const secretKey = secretKeyInput.value.trim();

  if (publicKey !== '' && secretKey !== '') {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'true');
  }
}

// Initially disable the submit button
submitButton.setAttribute('disabled', 'true');









document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values entered by the user

  const endpointUrl = config.apiUrl + '/v1/banks?limit=1000&page=1&sort_dir=ASC';
  const redirectUrl = 'mandate.html';
  console.log(config.apiKey)

  const username = document.getElementById('public-key').value;
  const password = document.getElementById('secret-key').value;

  // Save the username and password to localStorage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);

  // Create the Basic Auth header by encoding the username and password
  const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);
  console.log(basicAuthHeader)

  try {
    const response = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Authorization': basicAuthHeader,
        'X-API-Key': config.apiKey
      }
    });

    if (response.ok) {
      // Handle a successful response here

      const data = await response.json();
      
      const successMessage = data.message; // Replace 'message' with the actual key in your API response
      showToast(successMessage, 'success');
      window.location.href = 'mandate.html'
      // Redirect the user or perform other actions as needed
    } else {
      // Handle an error response here
      const errorData = await response.json();
      const errorMessage = data.message; // Replace 'error' with the actual key in your API response
      showToast(errorMessage, 'error');
      
      // You can also log the error response for debugging
      console.error('Error response:', errorData);
      
    }
  } catch (error) {
    // Handle any fetch-related errors
    showToast("Unauthorized", 'error');
    console.error('Fetch error:', error);
  }
});


