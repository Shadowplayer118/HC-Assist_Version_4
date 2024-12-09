<?php

include '../connection.php';

// Check if the 'id' parameter is set in the GET request
if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'ID parameter missing']);
    exit;
}

$patient_id = intval($_GET['id']);

// Securely get and cast the 'id' parameter to an integer

// SQL query with a placeholder for the staff ID
$sql = "Select pregnant.pregnant_id, patient.first_name, patient.last_name, pregnant.start_date,
pregnant.expected_due_date, pregnant.pregnancy_status, pregnant.father, pregnant.father_contact  from pregnant inner join patient on pregnant.patient_id = patient.patient_id WHERE pregnant.pregnant_id = ?";
$stmt = $conn->prepare($sql);

// Check if the statement was prepared successfully
if ($stmt === false) {
    echo json_encode(['error' => 'Failed to prepare statement']);
    exit;
}

// Bind the parameter to the statement
$stmt->bind_param("i", $patient_id);

// Execute the prepared statement
$stmt->execute();

// Bind the result variables
$stmt->bind_result($pregnant_id, $first_name, $last_name, $start_date, $expected_due_date, $pregnancy_status,$father,$father_contact);

// Fetch the results and output them as a JSON object
if ($stmt->fetch()) {
    echo json_encode([
        'pregnant_id' => $pregnant_id,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'start_date' => $start_date,
        'expected_due_date' => $expected_due_date,
        'pregnancy_status' => $pregnancy_status,
        'father' => $father,
        'father_contact' => $father_contact,
    
    ]);
} else {
    echo json_encode(['error' => 'patient not found']);
}

// Close the statement and the database connection
$stmt->close();
$conn->close();

?>
