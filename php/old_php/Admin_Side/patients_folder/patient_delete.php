<?php
include '../connection.php';

// Get the input data
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

if (isset($data['id']) && is_numeric($data['id'])) {
    $id = $data['id'];

    $sql = "DELETE FROM patient WHERE patient_id = ?";
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        $response = ['status' => 'error', 'message' => 'Statement preparation failed.'];
        echo json_encode($response);
        exit;
    }
    
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        $response = ['status' => 'success', 'message' => 'Patient deleted successfully.'];
    } else {
        $response = ['status' => 'error', 'message' => 'Failed to delete patient.'];
    }

    echo json_encode($response);
    $stmt->close();
} else {
    $response = ['status' => 'error', 'message' => 'Invalid Patient ID.'];
    echo json_encode($response);
}

$conn->close();
?>
