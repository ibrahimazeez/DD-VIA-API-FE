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
        const response = await fetch("https://dd-api.assurdly.com/v1/beneficiaries", {
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
