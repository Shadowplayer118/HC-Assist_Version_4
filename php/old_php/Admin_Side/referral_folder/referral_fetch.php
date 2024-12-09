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
$sql = "Select referrals.referral_id, patient.first_name, patient.last_name, referrals.referral_date,
referrals.approval_status, referrals.description from referrals inner join patient on referrals.patient_id = patient.patient_id WHERE referrals.referral_id = ?";
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
$stmt->bind_result($referral_id, $first_name, $last_name, $referral_date, $status, $description);

// Fetch the results and output them as a JSON object
if ($stmt->fetch()) {
    echo json_encode([
        'referral_id' => $referral_id,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'referral_date' => $referral_date,
        'approval_status' => $status,
        'description' => $description,
    
    ]);
} else {
    echo json_encode(['error' => 'patient not found']);
}

// Close the statement and the database connection
$stmt->close();
$conn->close();

?>
