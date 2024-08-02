<!DOCTYPE html>
<html>
<head>
  <title>Simple JavaScript Example</title>
</head>
<body>

<h1>Welcome to Event Sync!</h1>

<button id="myButton">Click Me!</button>

<script>
// Function to show alert
function showAlert() {
  alert("Button was clicked!");
}

// Get the button element
var button = document.getElementById("myButton");

// Add event listener to the button
button.addEventListener("click", showAlert);
</script>

</body>
</html>
