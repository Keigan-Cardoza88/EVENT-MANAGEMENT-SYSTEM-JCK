document.getElementById('signInButton').addEventListener('click', function() {
  document.getElementById('signInModal').style.display = 'flex';
});

document.getElementById('closeModalButton').addEventListener('click', function() {
  document.getElementById('signInModal').style.display = 'none';
});

document.getElementById('signInForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
      document.getElementById('message').innerText = 'Sign-in successful!';
  } else {
      document.getElementById('message').innerText = 'Please fill out all fields.';
  }
});
