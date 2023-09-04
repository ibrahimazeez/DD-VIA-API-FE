// document.addEventListener('DOMContentLoaded', function () {
//     // Retrieve the username and password from localStorage
//     const username = localStorage.getItem('username');
//     const password = localStorage.getItem('password');
//     // const apiKey = 'tE9SzsjKP2gmvsnYriLKIZc2bMgRG2x0eMd4o50A';
//     // Construct the Basic Auth header
//     const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);
//     // The endpoint URL to fetch data
//     // const endpointUrl = 'https://example.com/api/data';
//     const endpointUrl = baseUrl + '/v1/mandates';
  
//   alert("me")
  
//     fetch(endpointUrl, {
//       method: 'GET',
//       headers: {
//         'Authorization': basicAuthHeader,
//         'X-API-Key': apiKey
  
//       }
      
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok.');
//         }
//         return response.json();
//       })
//       .then(responseData => {
//         const data = responseData.data.data; // Extract the array of data from the response
//         console.log(data[0].bank.name)
  
//         // Get the table body element
//         const tableBody = document.getElementById('table').getElementsByTagName('tbody')[0];
  
//         // Clear existing table rows
//         tableBody.innerHTML = '';
  
//         // Iterate through the data and create table rows
//         data.forEach(item => {
//           const newRow = document.createElement('tr');
  
//           // Populate each cell with the data from the object
//           const columns = ['reference_number', 'account_name', 'bank', 'start_date', 'end_date', 'frequency', 'amount', 'status'];
  
//           columns.forEach(column => {
//             const cell = document.createElement('td');
//             cell.textContent = item[column];
//             newRow.appendChild(cell);
//           });
  
//           if (columns === 'bank') {
//             cell.textContent = data[0].bank.name;
//             console.log(data[0].bank.name)
//           }
//           tableBody.appendChild(newRow);
//         });
//       })
//       .catch(error => {
//         console.error('Fetch error:', error);
//       });
//   });







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
  const endpointUrl = config.apiUrl + '/v1/mandates';


  fetch(endpointUrl, {
    method: 'GET',
    headers: {
      'Authorization': basicAuthHeader,
      'X-API-Key': config.apiKey

    }
    
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(responseData => {
      const data = responseData.data.data; // Extract the array of data from the response
      console.log(data[0].bank.name)

      var startDate = data[0].start_date
      var startDate = startDate.slice(0,10)

      console.log(startDate)

      // Get the table body element
      const tableBody = document.getElementById('table').getElementsByTagName('tbody')[0];

      // Clear existing table rows
      tableBody.innerHTML = '';

      // Iterate through the data and create table rows
      data.forEach(item => {
        const newRow = document.createElement('tr');

        // Populate each cell with the data from the object
        const columns = ['reference_number', 'account_name', 'bank', 'start_date', 'end_date', 'frequency', 'amount', 'status'];

        columns.forEach(column => {
          const cell = document.createElement('td');
          cell.textContent = item[column];
          newRow.appendChild(cell);
        });

        // if (columns === 'start_date') {
        //   cell.textContent = me;
        //   console.log("me")
        // }
        tableBody.appendChild(newRow);
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
});