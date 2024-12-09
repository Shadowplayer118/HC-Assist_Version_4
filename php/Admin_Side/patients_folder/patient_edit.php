<?php
include '../connection.php';

if (!isset($_POST['patient_id'])) {
    echo json_encode(['error' => 'Form data missing']);
    exit;
}
$patient_id = intval($_POST['patient_id']);
$first_name = htmlspecialchars(trim($_POST['first_name']));
$middle_name = htmlspecialchars(trim($_POST['middle_name']));
$last_name = htmlspecialchars(trim($_POST['last_name']));
$gender = htmlspecialchars(trim($_POST['gender']));
$purok = htmlspecialchars(trim($_POST['purok']));
$household = htmlspecialchars(trim($_POST['household']));
$civil_status = htmlspecialchars(trim($_POST['civil_status']));
$age = intval($_POST['age']);
$contact = htmlspecialchars(trim($_POST['contact_number']));
$blood_type = htmlspecialchars(trim($_POST['blood_type']));


$sql = "UPDATE patient SET first_name = ?, middle_name = ?, last_name = ?, gender = ?, purok= ?, household = ?, civil_status = ?, age = ?, contact_number = ? , blood_type = ? WHERE patient_id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement']);
    exit;
}

$stmt->bind_param("sssssssissi", $first_name, $middle_name, $last_name, $gender, $purok, $household, $civil_status, $age, $contact, $blood_type,$patient_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Character updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update character.']);
}

$stmt->close();
$conn->close();
?>
