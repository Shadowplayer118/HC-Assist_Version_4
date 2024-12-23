<?php
include '../../connection.php';

// Set response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// SQL query to fetch all purok data
$sql = "SELECT purok_id, purok_name FROM purok"; // Replace `id` and `name` with your actual column names
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $purokData = [];
    while ($row = $result->fetch_assoc()) {
        $purokData[] = $row;
    }
    echo json_encode(['success' => true, 'data' => $purokData]);
} else {
    echo json_encode(['success' => false, 'data' => []]);
}

$conn->close();
?>
