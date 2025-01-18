<?php
include '../connection.php';

// Database connection
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check connection
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}
$patient_id = 79;

// isset($_GET['patient_id'])
// Check if patient_id is provided
if ($patient_id!=0) {   
    // $patient_id = intval($_GET['patient_id']);
    $patient_id = 79;

    // Prepare SQL queries
    $patientQuery = "SELECT * FROM patient WHERE patient_id = ?";
    $medicalRecordQuery = "SELECT * FROM medical_record WHERE patient_id = ?";

    // Fetch patient data
    $patientStmt = $conn->prepare($patientQuery);
    $patientStmt->bind_param('i', $patient_id);
    $patientStmt->execute();
    $patientResult = $patientStmt->get_result();

    $patientData = $patientResult->fetch_assoc();

    // Fetch medical record data
    $medicalRecordStmt = $conn->prepare($medicalRecordQuery);
    $medicalRecordStmt->bind_param('i', $patient_id);
    $medicalRecordStmt->execute();
    $medicalRecordResult = $medicalRecordStmt->get_result();

    $medicalRecords = [];
    while ($row = $medicalRecordResult->fetch_assoc()) {
        $medicalRecords[] = $row;
    }

    // Fetch medical history data

    // Combine all data into one array
    $response = [
        'patient' => $patientData,
        'medical_records' => $medicalRecords,
        
    ];

    // Return the combined data as JSON
    echo json_encode($response);

    // Close statements
    $patientStmt->close();
    $medicalRecordStmt->close();
} else {
    echo json_encode(['error' => 'Missing patient_id parameter']);
}

// Close the database connection
$conn->close();
?>
