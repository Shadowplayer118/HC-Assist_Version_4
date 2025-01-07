<?php
header('Access-Control-Allow-Origin: *');  // Update this to a specific domain for production
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

include '../../connection.php';

$input = json_decode(file_get_contents('php://input'), true);
$workflow_id = $input['workflow_id'] ?? null;

if (!$workflow_id) {
    echo json_encode(['error' => 'Missing workflow_id.']);
    exit;
}

// Constants for statuses
define('STATUS_CURRENT', 'Current');
define('STATUS_PENDING', 'Pending');

try {
    // Begin transaction
    $conn->begin_transaction();

    // Reset all steps to Pending
    $resetQuery = $conn->prepare("UPDATE active_steps SET activeStep_status = ? WHERE workflow_id = ?");
    $pendingStatus = 'Pending';
    $resetQuery->bind_param("si", $pendingStatus, $workflow_id);
    $resetQuery->execute();

    // Set the first step to Current
    $firstStepQuery = $conn->prepare("SELECT MIN(activeStep_sequence) AS first_sequence FROM active_steps WHERE workflow_id = ?");
    $firstStepQuery->bind_param("i", $workflow_id);
    $firstStepQuery->execute();
    $firstStepResult = $firstStepQuery->get_result();
    $firstStep = $firstStepResult->fetch_assoc();

    if (!$firstStep || !$firstStep['first_sequence']) {
        throw new Exception("No steps found for the provided workflow_id.");
    }

    $firstSequence = $firstStep['first_sequence'];
    $updateFirstStep = $conn->prepare("UPDATE active_steps SET activeStep_status = ? WHERE workflow_id = ? AND activeStep_sequence = ?");
    $currentStatus = 'Current';
    $updateFirstStep->bind_param("sii", $currentStatus, $workflow_id, $firstSequence);
    $updateFirstStep->execute();

    // Commit transaction
    $conn->commit();

    echo json_encode(['success' => true, 'message' => 'Workflow reset successfully.']);
} catch (Exception $e) {
    // Rollback transaction on error
    $conn->rollback();
    echo json_encode(['error' => $e->getMessage()]);
}
?>
