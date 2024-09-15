<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "ems_db");

// Function to get ongoing events for users
function getOngoingEvents() {
    global $conn;
    $result = $conn->query("SELECT * FROM events WHERE approved = 'yes' AND status = 'ongoing'");
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Function to get pending events for faculty approval
function getPendingEvents() {
    global $conn;
    $result = $conn->query("SELECT * FROM events WHERE approved = 'no'");
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Approving events by faculty
if (isset($_POST['approve'])) {
    $event_id = $_POST['event_id'];
    $approval_status = $_POST['approve'] == 'yes' ? 'yes' : 'no';
    $conn->query("UPDATE events SET approved = '$approval_status' WHERE id = $event_id");
    header("Location: faculty_dashboard.html");
    exit();
}

// Handle event creation by Head
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['event_name'])) {
    $organizer = $_POST['organizer'];
    $event_name = $_POST['event_name'];
    $purpose = $_POST['purpose'];
    $description = $_POST['description'];
    $privacy = $_POST['privacy'];
    $category = $_POST['category'];
    $who_can_register = implode(',', $_POST['who_can_register']); // Convert array to comma-separated string
    $social_links = $_POST['social_links'];

    // Handle file upload (thumbnail)
    $thumbnail_name = $_FILES['thumbnail']['name'];
    $thumbnail_tmp = $_FILES['thumbnail']['tmp_name'];
    $thumbnail_path = 'uploads/' . basename($thumbnail_name);
    move_uploaded_file($thumbnail_tmp, $thumbnail_path); // Move uploaded file to server

    // Insert event into the database
    $stmt = $conn->prepare("INSERT INTO events (organizer, event_name, purpose, description, privacy, category, who_can_register, social_links, thumbnail, approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'no')");
    $stmt->bind_param("sssssssss", $organizer, $event_name, $purpose, $description, $privacy, $category, $who_can_register, $social_links, $thumbnail_name);
    $stmt->execute();

    header("Location: head_dashboard.html");
    exit();
}
?>
