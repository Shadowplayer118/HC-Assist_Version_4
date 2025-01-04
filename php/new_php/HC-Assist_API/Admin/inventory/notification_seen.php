<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include '../../connection.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$ids = $data['ids'] ?? [];

if (!is_array($ids)) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$query = "UPDATE expirations SET isViewed = 1 WHERE expiration_id IN (" . implode(',', array_map('intval', $ids)) . ")";
if ($conn->query($query)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}
?>
