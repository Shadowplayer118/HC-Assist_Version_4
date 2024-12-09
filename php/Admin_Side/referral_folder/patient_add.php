<?php

include '../connection.php';

$patient_id = $_POST['edit-patient_id'];
$name = $_POST['edit-first_name'];
$description = $_POST['description'];
$approval_status = $_POST['approval_status'];
$referral_date = $_POST['referral_date'];



$sql = "INSERT INTO referrals (patient_id,description,approval_status,referral_date) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Correct type specifiers and added missing variable
$stmt->bind_param("isss", $patient_id,$description,$approval_status, $referral_date);

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
