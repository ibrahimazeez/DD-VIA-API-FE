// import { baseUrl, apiKey } from './config.js'
import { config }  from './variables.js';

document.getElementById('login-form').addEventListener('submit', function (event) {
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

  fetch(endpointUrl, {
    method: 'GET', // Replace with the appropriate HTTP method (GET, POST, PUT, etc.)
    headers: {
      'Authorization': basicAuthHeader,
      'X-API-Key': config.apiKey

    }
  })
    .then(response => {
      if (response.ok) {
        // Redirect the user to the success page if the response is successful
        window.location.href = redirectUrl;
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
});


