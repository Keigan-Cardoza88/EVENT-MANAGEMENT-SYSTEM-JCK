<?php
include "db-connection.php";

// SQL query to fetch ongoing events
$sql = "SELECT * FROM eventdetails";
$result = $connection->query($sql);

$events = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
}

$connection->close();

// Output the events as JSON
header('Content-Type: application/json');
echo json_encode($events);
?>
