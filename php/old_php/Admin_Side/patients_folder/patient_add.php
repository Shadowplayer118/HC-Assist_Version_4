<?php

include '../connection.php';

$first_name = $_POST['first_name'];
$middle_name = $_POST['middle_name'];
$last_name = $_POST['last_name'];
$gender = $_POST['gender'];
$purok = $_POST['purok'];
$household = $_POST['household'];
$civil_status = $_POST['civil_status'];
$age = $_POST['age'];
$contact_number = $_POST['contact_number'];
$blood_type = $_POST['blood_type'];
$birth_date = $_POST['birth_date'];


$sql = "INSERT INTO patient (first_name, middle_name, last_name, gender, purok, household, civil_status, age, contact_number,blood_type,birth_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Correct type specifiers and added missing variable
$stmt->bind_param("sssssssisss", $first_name, $middle_name, $last_name, $gender, $purok, $household, $civil_status, $age, $contact_number, $blood_type, $birth_date);

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
