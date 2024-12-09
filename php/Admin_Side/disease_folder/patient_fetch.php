<?php

include '../connection.php';

// Check if the 'id' parameter is set in the GET request
if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'ID parameter missing']);
    exit;
}

$patient_id = intval($_GET['id']); // Securely get and cast the 'id' parameter to an integer

// SQL query with a placeholder for the staff ID
$sql = "SELECT patient_id, first_name, middle_name, last_name, gender, birth_date, purok, household, civil_status, age, contact_number, blood_type FROM patient WHERE patient_id = ?";
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
$stmt->bind_result($patient_id, $first_name, $middle_name, $last_name, $gender, $birth_date, $purok, $household, $civil_status, $age, $contact_number, $blood_type);

// Fetch the results and output them as a JSON object
if ($stmt->fetch()) {
    echo json_encode([
        'patient_id' => $patient_id,
        'first_name' => $first_name,
        'middle_name' => $middle_name,
        'last_name' => $last_name,
        'birth_date' => $birth_date,
        'gender' => $gender,
        'purok' => $purok,
        'household' => $household,
        'civil_status' => $civil_status,
        'age' => $age,
        'contact_number' => $contact_number,
        'blood_type' => $blood_type,
    ]);
} else {
    echo json_encode(['error' => 'patient not found']);
}

// Close the statement and the database connection
$stmt->close();
$conn->close();

?>
