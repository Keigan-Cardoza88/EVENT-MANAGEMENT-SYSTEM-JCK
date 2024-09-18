<?php
include "db-connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Fetch the user's stored password hash from the database
    $stmt = $connection->prepare("SELECT user_password FROM users WHERE user_email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashedPassword);
        $stmt->fetch();

        // Verify the entered password against the stored hash
        if (password_verify($password, $hashedPassword)) {
            // Successful login, return a success message with a URL
            $stmt->close();
            $connection->close();
            echo "Login successful";
        } else {
            // Password is incorrect
            $stmt->close();
            $connection->close();
            echo "Incorrect password";
        }
    } else {
        // Email not found in the database
        $stmt->close();
        $connection->close();
        echo "User not found";
    }
}
?>
