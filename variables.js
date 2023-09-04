export const config = {
    apiUrl: "https://direct-debit-test.sterlingapps.p.azurewebsites.net",
    apiKey: "tE9SzsjKP2gmvsnYriLKIZc2bMgRG2x0eMd4o50A",
    maxResults: 100,
    // Add more properties as needed
  };

  // export const localStorage = {
  //    username : localStorage.getItem('username'),
  //    password : localStorage.getItem('password'),
  // }

  export function accessLocalStorage (){
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return username, password
  }
  // b2af775308ac47a8daee9011d817ca50f6cc7b742de012672547149e7a5b5ff3  - Private KEY
  // b0e33bcba14202b3b92eb587e5454784 - PUBLIC KEY
  // https://vigil.lendsqr.com/dd
  // https://dd-api.assurdly.com
  // https://direct-debit-test.sterlingapps.p.azurewebsites.net

  // Sterling Keys
  // 810f647970b6cff9ccc543d547cd536ebd440e8bbd7d28e8538ffc25b4ba6b0d
  // 67712b093e45ebd5fb2b856b7af3270f