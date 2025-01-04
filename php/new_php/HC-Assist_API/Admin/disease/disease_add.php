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
$disease_patient_id = $_POST['disease_patient_id'] ?? null;
$disease_patient_name = $_POST['disease_patient_name'] ?? null;
$disease_status = $_POST['disease_status'] ?? null;
$disease_stage = $_POST['disease_stage'] ?? null;
$disease_treatmentSched = $_POST['disease_treatmentSched'] ?? null;

// Validate required fields
if (!$disease_patient_id || !$disease_patient_name || !$disease_status || !$disease_stage || !$disease_treatmentSched) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Insert into contagious_disease
$diagnosis_date = date('Y-m-d'); // Current date
$administered_by = 1;

$sql = "INSERT INTO contagious_disease (patient_id, disease_name, diagnosis_date, disease_status, disease_stage, administered_by)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("issssi", $disease_patient_id, $disease_patient_name, $diagnosis_date, $disease_status, $disease_stage, $administered_by);

if ($stmt->execute()) {
    // Get the latest disease_id
    $latestDiseaseId = $conn->insert_id;

    // Determine treatment_type based on disease_name
    $treatment_type = '';
    switch (strtolower($disease_patient_name)) {
        case 'leprosy':
            $treatment_type = 'Leprosy Treatment';
            break;
        case 'tuberculosis':
            $treatment_type = 'TB Treatment';
            break;
        case 'covid':
            $treatment_type = 'COVID Treatment';
            break;
        default:
            $treatment_type = 'General Treatment'; // Default if not one of the specified diseases
    }

    // Insert into disease_schedule
    $activity = $treatment_type;
    $status = "Good";

    $sql_schedule = "INSERT INTO disease_schedule (activity, status, disease_schedule_date, disease_id)
                     VALUES (?, ?, ?, ?)";

    $stmt_schedule = $conn->prepare($sql_schedule);
    $stmt_schedule->bind_param("sssi", $activity, $status, $disease_treatmentSched, $latestDiseaseId);

    if ($stmt_schedule->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Data added successfully!', 'latestDiseaseId' => $latestDiseaseId]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add to disease_schedule: ' . $stmt_schedule->error]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add to contagious_disease: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
