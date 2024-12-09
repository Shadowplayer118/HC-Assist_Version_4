<?php

include '../connection.php';

$patient_id = $_POST['edit-patient_id'];
$name = $_POST['edit-first_name'];
$start_date = $_POST['start_date'];
$expected_due_date = $_POST['expected_due_date'];
$pregnancy_status = $_POST['pregnancy_status'];
$father = $_POST['father'];
$father_contact = $_POST['father_contact'];



$sql = "INSERT INTO pregnant (patient_id,start_date,expected_due_date,pregnancy_status,father,father_contact) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Correct type specifiers and added missing variable
$stmt->bind_param("isssss", $patient_id, $start_date, $expected_due_date, $pregnancy_status, $father, $father_contact);

if ($stmt->execute()) {
    $response = ['status' => 'success', 'message' => 'Character added successfully.'];
    echo json_encode($response);
} else {
    $response = ['status' => 'error', 'message' => 'Failed to add character.'];
    echo json_encode($response);
}

$stmt->close();
$conn->close();
?>
