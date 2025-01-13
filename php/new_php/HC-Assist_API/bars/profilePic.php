<?php
include '../connection.php';

// Database connection
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");



// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Get input data
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$position = $data['position'] ?? null;


if (!$id || !$position) {
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
    exit;
}

// Determine the table to query
$table = $position === '"Patient"' ? 'Patient' : ($position === '"Admin"' ? 'Staff' : null);

// if (!$table) {
//     echo json_encode(['success' => false, 'message' => 'Invalid position']);
//     exit;
// }

if($position == '"Admin"'){
    $stmt = $conn->prepare("SELECT image FROM $table WHERE staff_id = ?");
}


else{
    $stmt = $conn->prepare("SELECT image FROM $table WHERE patient_id = ?");
}

// Query for the image

$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(['success' => true, 'image' => $row['image']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Image not found']);
}

$stmt->close();
$conn->close();
?>
