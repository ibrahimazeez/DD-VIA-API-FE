document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values entered by the user

  const endpointUrl = 'https://vigil.lendsqr.com/dd/v1/banks?limit=1000&page=1&sort_dir=ASC';
  const redirectUrl = 'https://ibrahimazeez.github.io/DD-VIA-API-FE/dist/mandate.html';
  const apiKey = 'tE9SzsjKP2gmvsnYriLKIZc2bMgRG2x0eMd4o50A';
  console.log(redirectUrl)
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
      'X-API-Key': apiKey

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
