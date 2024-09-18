<?php 
    include "db-connection.php";
?>
<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "emsdb";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $eventDate = $_POST['eventDate'];
        $eventTime = $_POST['eventTime'];
        $eventVenue = $_POST['eventVenue'];
        $eventOrganizer = $_POST['eventOrganizer'];
        $eventName = $_POST['eventName'];
        $eventDescription = $_POST['eventDescription'];
        $eventCategory = $_POST['eventCategory'];
        $eventWhoCanRegister = $_POST['eventWhoCanRegister'];

        $sql = "INSERT INTO eventdetails (event_date, event_time, event_venue, event_organizer, event_name, event_description, event_category, event_who_can_register)
                VALUES ('$eventDate', '$eventTime', '$eventVenue', '$eventOrganizer', '$eventName', '$eventDescription', '$eventCategory', '$eventWhoCanRegister')";

        if ($conn->query($sql) === TRUE) {
            echo "Event created successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    $conn->close();
?>
