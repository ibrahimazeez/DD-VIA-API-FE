import { config }  from './variables.js';
import { showToast } from './toast.js';

document.addEventListener('DOMContentLoaded', function () {
  // Retrieve the username and password from localStorage
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  // const apiKey = 'tE9SzsjKP2gmvsnYriLKIZc2bMgRG2x0eMd4o50A';
  // Construct the Basic Auth header
  const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);
  // The endpoint URL to fetch data
  // const endpointUrl = 'https://example.com/api/data';
  const endpointUrl = config.apiUrl + '/v1/beneficiaries';

  fetch(endpointUrl, {
    method: 'GET',
    headers: {
      'Authorization': basicAuthHeader,
      'X-API-Key': config.apiKey

    }
    
  })
  .then(response => {
    if (response.status === 401) {
      // Clear local storage and navigate to index.html
     
      showToast('Unauthorized', 'error');
      localStorage.clear();
      window.location.href = 'index.html'; // Replace with your actual path
    } else if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
    .then(responseData => {
      const data = responseData.data.data; // Extract the array of data from the response
      console.log(data)

      // Get the table body element
      const tableBody = document.getElementById('table').getElementsByTagName('tbody')[0];

      // Clear existing table rows
      tableBody.innerHTML = '';

      // Iterate through the data and create table rows
      data.forEach(item => {
        const newRow = document.createElement('tr');
  
        // Populate each cell with the data from the object
        const columns = ['account_name', 'account_number', 'bank', 'last_transaction_date', 'status'];
  
        columns.forEach(column => {
          const cell = document.createElement('td');
  
          if (column === 'bank') {
            // Access properties within the 'bank' object
            const bankName = item.bank.name;
            // const bankCode = item.bank.bank_code;
  
            // You can display the bank information as you need, for example:
            cell.textContent = `${bankName}`;
          } else {
            // For other columns, simply access the item's property
            cell.textContent = item[column];
          }
  
          newRow.appendChild(cell);
        });
  
        tableBody.appendChild(newRow);
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  
});