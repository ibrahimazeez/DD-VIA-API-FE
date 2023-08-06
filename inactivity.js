// inactivity.js

// Set the inactivity timeout duration in milliseconds
const inactivityTimeout = 60000; // 10 seconds

let inactivityTimer;

function resetInactivityTimer() {
  // Clear the previous timer (if any) and start a new one
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(handleInactivity, inactivityTimeout);
}

function handleInactivity() {
  // Clear local storage (remove any user-related data)
  localStorage.clear();

  // Redirect the user to the login page (you can replace "login.html" with your actual login page URL)
  window.location.href = 'index.html';
}

// Add event listeners to capture user activity
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);

// Start the initial timer when the app loads
resetInactivityTimer();
