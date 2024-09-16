<?php
include "db-connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if email already exists
    $checkEmailSql = "SELECT user_email FROM users WHERE user_email = '$email'";
    $result = mysqli_query($connection, $checkEmailSql);

    if (mysqli_num_rows($result) > 0) {
        // Email already exists
        echo 'User email is already taken';
    } else {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert data into the database
        $sql = "INSERT INTO users (user_email, user_password) VALUES ('$email', '$hashedPassword')";

        if (mysqli_query($connection, $sql)) {
            // Send success response
            echo 'Registration successful';
        } else {
            // Send error response
            echo 'Error: ' . mysqli_error($connection);
        }
    }

    // Close the database connection
    mysqli_close($connection);
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Management JCK</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="logo" style="font-weight: 750;"><span style="color: rgb(0, 0, 0);">DBIT</span> EventSync</div>
        <nav class="navBar">
            <ul>
                <li><a href="index.php">Home</a></li>
            </ul>
        </nav>
    </header>
    <div class="signUpContainer">
        <h2>Sign Up</h2>
        <form id="signUpForm" method="post" action="">
            <label for="email">Email</label>
            <input type="text" id="email" name="email" required>

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>

            <input type="submit" value="Sign Up">
        </form>
    </div>

    <script src="scripts.js"></script>

</body>
</html>
