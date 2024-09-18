<?php
include "db-connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if the email already exists
    $stmt = $connection->prepare("SELECT user_email FROM users WHERE user_email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Email already exists, return error message
        $stmt->close();
        $connection->close();
        echo "Email already exists. Please choose a different email.";
        exit();
    }

    // Hash the password before storing it
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Prepare and execute the insert statement
    $stmt = $connection->prepare("INSERT INTO users (user_email, user_password) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $hashedPassword);

    if ($stmt->execute()) {
        // Successful sign-up, return success message
        $stmt->close();
        $connection->close();
        echo "Sign-up successful! <a href='index2.html'>Go to Head Interface</a>";
        exit();
    } else {
        // Error occurred during sign-up, return error message
        $stmt->close();
        $connection->close();
        echo "Sign-up failed. Please try again.";
        exit();
    }
}
?>
