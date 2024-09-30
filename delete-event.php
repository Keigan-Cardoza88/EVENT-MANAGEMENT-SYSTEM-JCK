<?php
require 'db-connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Search for events based on the criteria
    if (empty($_POST['delete'])) {
        $eventName = $_POST['eventName'] ?? '';
        $eventOrganizer = $_POST['eventOrganizer'] ?? '';

        $query = "SELECT * FROM eventdetails WHERE event_name LIKE ? AND event_organizer LIKE ?";
        $stmt = $connection->prepare($query);
        $stmt->bind_param('ss', $eventNamePattern, $eventOrganizerPattern);

        $eventNamePattern = '%' . $eventName . '%';
        $eventOrganizerPattern = '%' . $eventOrganizer . '%';
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo "<h3>Search Results:</h3><ul>";
            while ($row = $result->fetch_assoc()) {
                echo "<li>
                        <p><strong>Name:</strong> " . htmlspecialchars($row['event_name']) . "</p>
                        <p><strong>Organizer:</strong> " . htmlspecialchars($row['event_organizer']) . "</p>
                        <p><strong>Description:</strong> " . htmlspecialchars($row['event_description']) . "</p>
                        <p><strong>Category:</strong> " . htmlspecialchars($row['event_category']) . "</p>
                        <p><strong>Venue:</strong> " . htmlspecialchars($row['event_venue']) . "</p>
                        <form method='post' action='delete-event.php'>
                            <input type='hidden' name='event_id' value='" . htmlspecialchars($row['event_id']) . "'>
                            <button type='submit' name='delete'>Delete</button>
                        </form>
                    </li>";
            }
            echo "</ul>";
        } else {
            echo "No events found.";
        }
    }
    
    // Delete event if 'delete' button was clicked
    if (isset($_POST['delete'])) {
        $eventId = $_POST['event_id'];

        $deleteQuery = "DELETE FROM eventdetails WHERE event_id = ?";
        $deleteStmt = $connection->prepare($deleteQuery);
        $deleteStmt->bind_param('i', $eventId);

        if ($deleteStmt->execute()) {
            // Redirect to the prompt page after successful deletion
            header('Location: prompt.html');
            exit();
        } else {
            echo "Error deleting event.";
        }
    }
}
?>
