<?php

include '../connection.php';

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set response headers for JSON and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Check if the 'id' parameter is set in the GET request
if (!isset($_GET['id'])) {
    // echo json_encode(['success' => false, 'error' => 'ID parameter missing']);
    // exit;
}

// Validate database connection
if (!$conn) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}

$patient_id = intval($_GET['id']); // Safely get and cast 'id' to integer

$patient_id = 42; // Safely get and cast 'id' to integer


// SQL query to fetch patient data
$sql = "SELECT patient_id, first_name, middle_name, last_name, gender, birth_date, purok, household, civil_status, age, contact_number, blood_type 
        FROM patient 
        WHERE patient_id = ?";
$stmt = $conn->prepare($sql);

// Check if the statement was prepared successfully
if (!$stmt) {
    echo json_encode(['success' => false, 'error' => 'Failed to prepare SQL statement']);
    exit;
}

// Bind the parameter
$stmt->bind_param("i", $patient_id);

// Execute the statement
if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'error' => 'Failed to execute statement']);
    exit;
}

// Bind the result variables
$stmt->bind_result(
    $patient_id,
    $first_name,
    $middle_name,
    $last_name,
    $gender,
    $birth_date,
    $purok,
    $household,
    $civil_status,
    $age,
    $contact_number,
    $blood_type
);

// Fetch the result and return it as JSON
if ($stmt->fetch()) {
    echo json_encode([
        'success' => true,
        'data' => [
            'patient_id' => $patient_id,
            'first_name' => $first_name,
            'middle_name' => $middle_name,
            'last_name' => $last_name,
            'gender' => $gender,
            'birth_date' => $birth_date,
            'purok' => $purok,
            'household' => $household,
            'civil_status' => $civil_status,
            'age' => $age,
            'contact_number' => $contact_number,
            'blood_type' => $blood_type,
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Patient not found']);
}

// Close statement and connection
$stmt->close();
$conn->close();

?>
