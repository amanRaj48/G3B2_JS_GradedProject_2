// login credentials
localStorage.setItem('username', 'sph');
localStorage.setItem('password', 'sph123');

//  event listener to the login button
document.getElementById('login-button').addEventListener('click', function () {
  const enteredUsername = document.getElementById('username').value;
  const enteredPassword = document.getElementById('password').value;

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (
    enteredUsername === storedUsername &&
    enteredPassword === storedPassword
  ) {
    // Redirect to the Resume Page
    window.location.href = 'jobselection6.html';
  } else {
    alert('Invalid username or password');
  }
});

/* // To disallow User back to login page from resume page
history.pushState(null, null, 'jobselection5.html');
window.addEventListener('popstate', function () {
  history.pushState(null, null, 'jobselection5.html');
}); */
