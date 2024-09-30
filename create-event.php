<?php 
include "db-connection.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data
    $eventStartDate = $_POST['event_start_date'];
    $eventEndDate = $_POST['event_end_date'];
    $eventStartTime = $_POST['event_start_time']; // New field for start time
    $eventEndTime = $_POST['event_end_time']; // New field for end time
    $eventVenue = $_POST['eventVenue'];
    $eventOrganizer = $_POST['eventOrganizer'];
    $eventName = $_POST['eventName'];
    $eventDescription = $_POST['eventDescription'];
    $eventCategory = $_POST['eventCategory'];
    $eventWhoCanRegister = implode(', ', $_POST['eventWhoCanRegister']); // Store as comma-separated values
    $eventDuration = $_POST['event_duration'];
    $eventOrganizerEmail = $_POST['event_organizer_email'];
    $eventOrganizerPhone = $_POST['event_organizer_phone'];

    // Insert data into the database
    $sql = "INSERT INTO eventdetails (event_start_date, event_end_date, event_start_time, event_end_time, event_venue, event_organizer, event_name, event_description, event_category, event_who_can_register, event_duration, number_of_attendees, registration_count, event_organizer_email, event_organizer_phone)
            VALUES ('$eventStartDate', '$eventEndDate', '$eventStartTime', '$eventEndTime', '$eventVenue', '$eventOrganizer', '$eventName', '$eventDescription', '$eventCategory', '$eventWhoCanRegister', '$eventDuration', 0, 0, '$eventOrganizerEmail', '$eventOrganizerPhone')";

    if ($connection->query($sql) === TRUE) {
        echo "Event created successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $connection->error;
    }
}

$connection->close();
?>
