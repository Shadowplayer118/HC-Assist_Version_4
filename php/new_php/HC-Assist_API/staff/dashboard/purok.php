<?php

include '../../connection.php';

// Allow cross-origin requests (for development purposes)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to count patients grouped by purok
$sql = "SELECT purok, COUNT(*) AS count FROM patient GROUP BY purok";
$result = $conn->query($sql);

$response = [];

// Fetch results
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = [
            'purok' => $row['purok'],
            'count' => (int)$row['count']
        ];
    }
} else {
    $response['error'] = "No data found.";
}

// Output the result as JSON
header('Content-Type: application/json');
echo json_encode($response);

// Close the connection
$conn->close();

?>
