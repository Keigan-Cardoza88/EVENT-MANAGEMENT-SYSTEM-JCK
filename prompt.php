<?php
    include "db-connection.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['deleteMore'])) {
        // Redirect to the delete event page
        header('Location: delete-event.html');
        exit();
    } elseif (isset($_POST['noMore'])) {
        // Redirect to the home page
        header('Location: index2.html');
        exit();
    }
}
?>
