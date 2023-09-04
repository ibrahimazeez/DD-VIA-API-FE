import { config }  from './variables.js';


var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



document.addEventListener("DOMContentLoaded", async function () {
    const dropdown = document.getElementById("beneficiary_id");

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);
    try {
        // Fetch data from your API endpoint using async/await
        const response = await fetch("https://direct-debit-test.sterlingapps.p.azurewebsites.net/v1/beneficiaries", {
            method: 'GET',
            headers: {
                'Authorization': basicAuthHeader,
                'X-API-Key': config.apiKey

            }
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const beneficiaries = data.data.data; // Assuming the accounts are inside a nested "data" property

        // Loop through the beneficiaries data and create options for the dropdown
        beneficiaries.forEach((beneficiaries) => {
            const option = document.createElement("option");
            option.value = beneficiaries.id;
            option.innerHTML = beneficiaries.account_name +" " + beneficiaries.account_number +" " + beneficiaries.bank.name;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error("Fetch error:", error);
    }
});



document.addEventListener("DOMContentLoaded", async function () {
    const dropdown = document.getElementById("bank_id");

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);
    try {
        // Fetch data from your API endpoint using async/await
        const response = await fetch("https://direct-debit-test.sterlingapps.p.azurewebsites.net/v1/banks?limit=100&page=1", {
            method: 'GET',
            headers: {
                'Authorization': basicAuthHeader,
                'X-API-Key': config.apiKey

            }
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const banks = data.data.data; // Assuming the accounts are inside a nested "data" property

        // Loop through the beneficiaries data and create options for the dropdown
        banks.forEach((banks) => {
            const option = document.createElement("option");
            option.value = banks.id;
            option.innerHTML = banks.name;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error("Fetch error:", error);
    }
});



// document.addEventListener("DOMContentLoaded", async function () {
//     const dropdown = document.getElementById("bank_id");

//     const username = localStorage.getItem('username');
//     const password = localStorage.getItem('password');

    
//   const textValue = document.getElementById('account_number').value;
//   const dropdownValue = document.getElementById('bank_id').value;
//   const nameField = document.getElementById('textInput').placeholder ;
//   const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);

//   const postDataObj = {
//     text: textValue,
//     option: dropdownValue,
//   };
 
//     try {
//         // Fetch data from your API endpoint using async/await
//         const response = await fetch("https://direct-debit-test.sterlingapps.p.azurewebsites.net/v1/banks/account-lookup", {
//             method: 'POST',
//             headers: {
//                 'Authorization': basicAuthHeader,
//                 'X-API-Key': config.apiKey,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(postDataObj),
//         });

//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         nameField = data
//         // const banks = data.data.data; // Assuming the accounts are inside a nested "data" property

//         // // Loop through the beneficiaries data and create options for the dropdown
//         // banks.forEach((banks) => {
//         //     const option = document.createElement("option");
//         //     option.value = banks.id;
//         //     option.innerHTML = banks.name;
//         //     dropdown.appendChild(option);
//         // });
//     } catch (error) {
//         console.error("Fetch error:", error);
//     }
// });


let inputFieldValue = ''; // Initialize the input field value

document.getElementById('account_number').addEventListener('input', function () {
  inputFieldValue = this.value;

//   const textValue = document.getElementById('account_number').value;
//   const dropdownValue = document.getElementById('bank_id').value;
const username = localStorage.getItem('username');
const password = localStorage.getItem('password');
const nameField = document.getElementById('text_input').value;
const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);

  if (inputFieldValue.length === 10) {
    console.log('Input field contains 10 numbers:', inputFieldValue);

    // Execute your POST request code here
    const dropdownValue = parseInt(document.getElementById('bank_id').value, 10);
    const postDataObj = {
        account_number: inputFieldValue,
        bank_id: dropdownValue,
    };
    console.log('Input field contains 10 numbers:', postDataObj.bank_id);



    fetch('https://direct-debit-test.sterlingapps.p.azurewebsites.net/v1/banks/account-lookup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuthHeader,
                'X-API-Key': config.apiKey,
        // Add any other headers you need here
      },
      body: JSON.stringify(postDataObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        // nameField = responseData.data.account_name 
        document.getElementById('text_input').value = responseData.data.account_name
        console.log(responseData.data.account_name); // Do something with the response data
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    inputFieldValue = ''; // Reset the input field value after processing
  }
});