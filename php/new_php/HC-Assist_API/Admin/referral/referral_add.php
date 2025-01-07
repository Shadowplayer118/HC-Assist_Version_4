<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include '../../connection.php';

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Retrieve POST data
$referral_patient_id = $_POST['referral_patient_id'] ?? null;
$referralName = $_POST['referralName'] ?? null;
$approvalStatus = $_POST['approvalStatus'] ?? null;
$referralDate = $_POST['referralDate'] ?? null;
$staffId = $_POST['staff_id'] ?? null;

// Validate required fields
if (!$referral_patient_id || !$referralName || !$approvalStatus || !$referralDate) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Insert into contagious_disease
$diagnosis_date = date('Y-m-d'); // Current date
$administered_by = $staffId;

$sql = "INSERT INTO referrals (patient_id, staff_id, description, referral_date, approval_status, signature)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iissss", $referral_patient_id, $staffId, $referralName, $referralDate, $approvalStatus, $approvalStatus);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Data added successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add to disease_schedule: ' . $stmt->error]);
    }


$stmt->close();
$conn->close();
?>
