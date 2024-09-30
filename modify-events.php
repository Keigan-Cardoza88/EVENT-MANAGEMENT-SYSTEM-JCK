<?php
include 'db-connection.php';  // Ensure your database connection is set here

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['searchName'])) {
        $searchName = mysqli_real_escape_string($connection, $_POST['searchName']);
        $query = "SELECT * FROM eventdetails WHERE event_name LIKE '%$searchName%'";
        $result = mysqli_query($connection, $query);

        if (mysqli_num_rows($result) > 0) {
            $events = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($events);
        } else {
            echo json_encode([]);  // Respond with an empty array instead of "No events found"
        }
    } elseif (isset($_POST['eventName'])) {
        $eventId = $_POST['eventId'];  // Assuming you're passing the event ID in the form
        $eventName = $_POST['eventName'];
        $eventOrganizer = $_POST['eventOrganizer'];
        $eventVenue = $_POST['eventVenue'];
        $eventStartDate = $_POST['eventStartDate'];
        $eventEndDate = $_POST['eventEndDate'];
        $eventTime = $_POST['eventTime'];
        $eventDuration = $_POST['eventDuration'];
        $eventOrganizerEmail = $_POST['eventOrganizerEmail'];
        $eventOrganizerPhone = $_POST['eventOrganizerPhone'];

        // Update query
        $query = "UPDATE eventdetails 
                  SET event_name='$eventName', event_organizer='$eventOrganizer', event_venue='$eventVenue',
                      event_start_date='$eventStartDate', event_end_date='$eventEndDate', event_time='$eventTime', 
                      event_duration='$eventDuration', event_organizer_email='$eventOrganizerEmail', event_organizer_phone='$eventOrganizerPhone'
                  WHERE event_id='$eventId'";

        if (mysqli_query($connection, $query)) {
            echo 'Event updated successfully';
        } else {
            echo 'Error updating event: ' . mysqli_error($connection);
        }
    }
}
?>
