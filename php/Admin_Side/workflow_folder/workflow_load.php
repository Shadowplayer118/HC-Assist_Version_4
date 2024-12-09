<?php
// Assuming you have a database connection established
// Replace this with your own database credentials
include '../connection.php';

// Create a connection


// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query the data from the database
$sql = "SELECT * FROM workflow"; // Adjust the query according to your database
$result = $conn->query($sql);

$cards = [];

if ($result->num_rows > 0) {
    // Fetch the data
    while($row = $result->fetch_assoc()) {
        $cards[] = $row;
    }
}

// Return the data as JSON
echo json_encode($cards);

// Close the connection
$conn->close();
?>
