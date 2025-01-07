<?php
header('Access-Control-Allow-Origin: *');  // Update this to a specific domain for production
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

include '../../connection.php';

$input = json_decode(file_get_contents('php://input'), true);
$workflow_id = $input['workflow_id'] ?? null;
$activeStep_sequence = $input['activeStep_sequence'] ?? null;

if (!$workflow_id || !$activeStep_sequence) {
    echo json_encode(['error' => 'Missing workflow_id or activeStep_sequence.']);
    exit;
}

// Constants for statuses
define('STATUS_CURRENT', 'Current');
define('STATUS_FINISHED', 'Finished');
define('STATUS_PENDING', 'Pending');

// Fetch the last step in the sequence



// Fetch the current step
$currentQuery = $conn->prepare("SELECT * FROM active_steps WHERE workflow_id = ? AND activeStep_status = ?");
$currentQuery->bind_param("is", $workflow_id, $currentStatus);
$currentStatus = STATUS_CURRENT;
$currentQuery->execute();
$currentResult = $currentQuery->get_result();
$currentStep = $currentResult->fetch_assoc();

if (!$currentStep) {
    echo json_encode(['error' => 'No Current step found.']);
    exit;
}

// Fetch the clicked step
$clickedQuery = $conn->prepare("SELECT * FROM active_steps WHERE workflow_id = ? AND activeStep_sequence = ?");
$clickedQuery->bind_param("ii", $workflow_id, $activeStep_sequence);
$clickedQuery->execute();
$clickedResult = $clickedQuery->get_result();
$clickedStep = $clickedResult->fetch_assoc();

if (!$clickedStep) {
    echo json_encode(['error' => 'Step not found.']);
    exit;
}

// Handle logic based on clicked step's status
if ($clickedStep['activeStep_status'] === STATUS_CURRENT) {
    // Update clicked step to Finished
    $updateClicked = $conn->prepare("UPDATE active_steps SET activeStep_status = ? WHERE workflow_id = ? AND activeStep_sequence = ?");
    $finishedStatus = STATUS_FINISHED;
    $updateClicked->bind_param("sii", $finishedStatus, $workflow_id, $activeStep_sequence);
    $updateClicked->execute();

    // Update the next step to Current
    $nextSequence = $activeStep_sequence + 1;
    $updateNext = $conn->prepare("UPDATE active_steps SET activeStep_status = ? WHERE workflow_id = ? AND activeStep_sequence = ?");
    $currentStatus = STATUS_CURRENT;
    $updateNext->bind_param("sii", $currentStatus, $workflow_id, $nextSequence);
    $updateNext->execute();

} elseif ($clickedStep['activeStep_status'] === STATUS_FINISHED) {




    if ($activeStep_sequence + 1 === $currentStep['activeStep_sequence']) {
        // Precedes Current; update statuses
        $updateCurrent = $conn->prepare("UPDATE active_steps SET activeStep_status = ? WHERE workflow_id = ? AND activeStep_sequence = ?");
        $pendingStatus = STATUS_PENDING;
        $updateCurrent->bind_param("sii", $pendingStatus, $workflow_id, $currentStep['activeStep_sequence']);
        $updateCurrent->execute();

        $updateClicked = $conn->prepare("UPDATE active_steps SET activeStep_status = ? WHERE workflow_id = ? AND activeStep_sequence = ?");
        $currentStatus = STATUS_CURRENT;
        $updateClicked->bind_param("sii", $currentStatus, $workflow_id, $activeStep_sequence);
        $updateClicked->execute();
    }

   
}

// Fetch and return all steps
$resultQuery = $conn->prepare("SELECT * FROM active_steps WHERE workflow_id = ? ORDER BY activeStep_sequence");
$resultQuery->bind_param("i", $workflow_id);
$resultQuery->execute();
$result = $resultQuery->get_result();

$steps = [];
while ($row = $result->fetch_assoc()) {
    $steps[] = $row;
}


echo json_encode(['success' => true, 'steps' => $steps]);




?>
