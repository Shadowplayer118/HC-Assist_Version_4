<?php
// Enable CORS for cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Database connection details
include '../../connection.php';

// Check connection
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}

// Get the current date
$current_date = date("Y-m-d");

// Prepare the query
$query = "SELECT DISTINCT inventory_id FROM expirations WHERE expiration_date <= ? AND actionTaken = 'none'";
$stmt = $conn->prepare($query);

// Check if the statement was prepared successfully
if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Query preparation failed: " . $conn->error
    ]);
    exit;
}

// Bind the parameter
$stmt->bind_param("s", $current_date);

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Fetch all rows and format the response
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row['inventory_id'];
}

// Close statement and connection
$stmt->close();
$conn->close();

// Return the results as JSON
echo json_encode($data);
?>
