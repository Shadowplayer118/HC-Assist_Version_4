<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include '../../connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$title = $data['title'] ?? '';
$description = $data['description'] ?? '';
$steps = $data['steps'] ?? [];

if (!$title || !$description || empty($steps)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    exit;
}

try {
    // Insert into `workflow`
    $sql = "INSERT INTO workflow(title, description) VALUES(?, ?)";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ss", $title, $description);
        if ($stmt->execute()) {
            $latestWorkflow = $conn->insert_id; // Get the last inserted workflow_id

            // Insert steps into `steps` table
            $number_of_steps = count($steps);
            $errors = [];
            for ($i = 0; $i < $number_of_steps; $i++) {
                $sql_schedule = "INSERT INTO steps (workflow_id, step_name, sequence)
                                 VALUES (?, ?, ?)";
                if ($stmt_workflow = $conn->prepare($sql_schedule)) {
                    $sequence = $i + 1; // Start sequence from 1
                    $step_name = $steps[$i];
                    $stmt_workflow->bind_param("isi", $latestWorkflow, $step_name, $sequence);
                    if (!$stmt_workflow->execute()) {
                        $errors[] = "Failed to add step '$step_name': " . $stmt_workflow->error;
                    }
                    $stmt_workflow->close();
                } else {
                    $errors[] = "Failed to prepare step insert query: " . $conn->error;
                }
            }

            if (empty($errors)) {
                echo json_encode(['status' => 'success', 'message' => 'Workflow and steps added successfully!', 'latestWorkflow' => $latestWorkflow]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Some steps failed to add.', 'errors' => $errors]);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to add workflow: ' . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to prepare workflow query: ' . $conn->error]);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
