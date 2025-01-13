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

// Get inventory_id from the request
$inventory_id = isset($_GET['inventory_id']) ? $_GET['inventory_id'] : null;
$current_date = date("Y-m-d");

if ($inventory_id === null) {
    echo json_encode([
        "success" => false,
        "message" => "Missing inventory_id parameter."
    ]);
    exit;
}

// Prepare the query
$query = "SELECT stocked, expiration_id, inventory_id, expiration_date FROM expirations WHERE inventory_id = ? AND actionTaken = 'none' AND expiration_date <= ?";
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
$stmt->bind_param("is", $inventory_id,$current_date);

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Fetch all rows and format the response
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = [
        "expiration_id" => $row['expiration_id'],
        "stocked" => $row['stocked'],
        "inventory_id" => $row['inventory_id'],
        "expiration_date" => $row['expiration_date']
    ];
}

// Close statement and connection
$stmt->close();
$conn->close();

// Return the results as JSON
echo json_encode($data);
?>
