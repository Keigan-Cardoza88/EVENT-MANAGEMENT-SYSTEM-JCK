<?php
include "db-connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if email exists
    $checkEmailSql = "SELECT user_password FROM users WHERE user_email = '$email'";
    $result = mysqli_query($connection, $checkEmailSql);

    if (mysqli_num_rows($result) > 0) {
        // Email exists, verify the password
        $row = mysqli_fetch_assoc($result);
        $hashedPassword = $row['user_password'];

        if (password_verify($password, $hashedPassword)) {
            // Password is correct
            echo 'Login successful';
        } else {
            // Password is incorrect
            echo 'Invalid email or password';
        }
    } else {
        // Email does not exist
        echo 'Invalid email or password';
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
    <div class="loginContainer">
        <h2>Login</h2>
        <form id="loginForm" method="post" action="">
            <label for="email">Email</label>
            <input type="text" id="email" name="email" required>

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>

            <input type="submit" value="Login">
        </form>
    </div>

    <script src="scripts.js"></script>

</body>
</html>

