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
$immuni_patient_id = $_POST['immuni_patient_id'] ?? null;
$immunization = $_POST['immunization'] ?? null;
$immunization_status = $_POST['immunization_status'] ?? null;
$immunization_treatmentSched = $_POST['immunization_treatmentSched'] ?? null;
$staffId = $_POST['staff_id'] ?? null;
$administered_date = $_POST['administered_date'] ?? null;
$administered_by = $_POST['administered_by'] ?? null;

// Validate required fields
// if (!$immuni_patient_id || !$immunization || !$immunization_status || !$immunization_treatmentSched) {
//     echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
//     exit;
// }

// Insert into contagious_disease
$diagnosis_date = date('Y-m-d'); // Current date
// $administered_by = $staffId;

$sql = "INSERT INTO immunization(patient_id, immunization_name, administered_date, administered_by)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("isss", $immuni_patient_id, $immunization, $administered_date, $administered_by);

if ($stmt->execute()) {
    // Get the latest disease_id
    $latestImmuoId = $conn->insert_id;

    // Determine treatment_type based on disease_name
    $treatment_type = 'Second Dose';
    // switch (strtolower($disease_patient_name)) {
    //     case 'leprosy':
    //         $treatment_type = 'Leprosy Treatment';
    //         break;
    //     case 'tuberculosis':
    //         $treatment_type = 'TB Treatment';
    //         break;
    //     case 'covid':
    //         $treatment_type = 'COVID Treatment';
    //         break;
    //     default:
    //         $treatment_type = 'General Treatment';
    // }

    // Insert into disease_schedule
    $activity = $treatment_type;
    $status = "Good";

    $sql_schedule = "INSERT INTO immunization_schedule (activity, status, immunization_schedule_date, immunization_id)
                     VALUES (?, ?, ?, ?)";

    $stmt_schedule = $conn->prepare($sql_schedule);
    $stmt_schedule->bind_param("sssi", $activity, $status, $immunization_treatmentSched, $latestImmuoId);

    if ($stmt_schedule->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Data added successfully!', 'latestImmuoId' => $latestImmuoId]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add to disease_schedule: ' . $stmt_schedule->error]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add to contagious_disease: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
