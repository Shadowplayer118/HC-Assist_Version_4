
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


include '../../connection.php';

$query = "SELECT expiration_id, expiration_date FROM expirations WHERE expiration_date <= NOW() AND isViewed = 0";
$result = $conn->query($query);

$expirations = [];
while ($row = $result->fetch_assoc()) {
    $expirations[] = $row;
}

echo json_encode($expirations);
?>
