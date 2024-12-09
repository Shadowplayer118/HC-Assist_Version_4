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
$sql = "Select immunization.immunization_id, patient.first_name, patient.last_name, immunization.immunization_name,
immunization.administered_date, immunization.administered_by from immunization 
inner join patient on immunization.patient_id = patient.patient_id 
WHERE immunization.immunization_id = ?";
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
$stmt->bind_result($immunization_id, $first_name, $last_name, $immunization_name, $administered_date, $administered_by);

// Fetch the results and output them as a JSON object
if ($stmt->fetch()) {
    echo json_encode([
        'immunization_id' => $immunization_id,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'immunization_name' => $immunization_name,
        'administered_date' => $administered_date,
        'administered_by' => $administered_by,
        
    
    ]);
} else {
    echo json_encode(['error' => 'patient not found']);
}

// Close the statement and the database connection
$stmt->close();
$conn->close();

?>
