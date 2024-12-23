<?php
include '../connection.php';

// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate the input
if (!isset($data['patient_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Patient ID is missing']);
    exit;
}

// Extract and sanitize input data
$patient_id = intval($data['patient_id']);
$first_name = htmlspecialchars(trim($data['first_name'] ?? ''));
$middle_name = htmlspecialchars(trim($data['middle_name'] ?? ''));
$last_name = htmlspecialchars(trim($data['last_name'] ?? ''));
$gender = htmlspecialchars(trim($data['gender'] ?? ''));
$purok = htmlspecialchars(trim($data['purok'] ?? ''));
$household = htmlspecialchars(trim($data['household'] ?? ''));
$civil_status = htmlspecialchars(trim($data['civil_status'] ?? ''));
$age = intval($data['age'] ?? 0);
$birth_date = htmlspecialchars(trim($data['birth_date'] ?? ''));
$contact_number = htmlspecialchars(trim($data['contact_number'] ?? ''));
$blood_type = htmlspecialchars(trim($data['blood_type'] ?? ''));

// Prepare the SQL query
$sql = "UPDATE patient 
        SET first_name = ?, middle_name = ?, last_name = ?, gender = ?, purok = ?, household = ?, civil_status = ?, age = ?, birth_date = ?, contact_number = ?, blood_type = ? 
        WHERE patient_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare the SQL statement']);
    exit;
}

// Bind parameters and execute the query
$stmt->bind_param(
    "ssssssisssi",
    $first_name,
    $middle_name,
    $last_name,
    $gender,
    $purok,
    $household,
    $civil_status,
    $age,
    $birth_date,
    $contact_number,
    $blood_type,
    $patient_id
);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Patient updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update patient']);
}

// Close connections
$stmt->close();
$conn->close();
?>
