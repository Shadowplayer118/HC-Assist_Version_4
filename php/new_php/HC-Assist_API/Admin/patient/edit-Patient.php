<?php

include '../../connection.php';

// Allow cross-origin requests (for development purposes)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Read the incoming JSON data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Check if JSON decoding was successful
if ($data === null) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data.']);
    exit;
}

// Extract data from the decoded JSON
$first_name = $data['first_name'] ?? null;
$middle_name = $data['middle_name'] ?? null;
$last_name = $data['last_name'] ?? null;
$gender = $data['gender'] ?? null;
$purok = $data['purok'] ?? null;
$household = $data['household'] ?? null;
$civil_status = $data['civil_status'] ?? null;
$age = $data['age'] ?? null;
$contact_number = $data['contact_number'] ?? null;
$blood_type = $data['blood_type'] ?? null;
$birth_date = $data['birth_date'] ?? null;
$patient_id = $data['patient_id'] ?? null; // Ensure patient_id is provided

// Check if patient_id is provided
if (!$patient_id) {
    echo json_encode(['status' => 'error', 'message' => 'Patient ID is required.']);
    exit;
}

// SQL query to update data in the patient table
$sql = "UPDATE patient 
        SET first_name = ?, 
            middle_name = ?, 
            last_name = ?, 
            gender = ?, 
            purok = ?, 
            household = ?, 
            civil_status = ?, 
            age = ?, 
            contact_number = ?, 
            blood_type = ? 
        WHERE patient_id = ?";

// Prepare the SQL statement
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare the SQL statement.']);
    exit;
}

// Bind the parameters to the prepared statement
$stmt->bind_param(
    "sssssssissi",
    $first_name,
    $middle_name,
    $last_name,
    $gender,
    $purok,
    $household,
    $civil_status,
    $age,
    $contact_number,
    $blood_type,
    $patient_id
);

// Execute the query and check for success
if ($stmt->execute()) {
    $response = ['status' => 'success', 'message' => 'Patient updated successfully.'];
    echo json_encode($response);
} else {
    $response = ['status' => 'error', 'message' => 'Failed to update patient.'];
    echo json_encode($response);
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();

?>
