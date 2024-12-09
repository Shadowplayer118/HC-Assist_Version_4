<?php

include '../connection.php';

$item_name = $_POST['item_name'];
$brand = $_POST['brand'];
$category = $_POST['category'];
$stock = $_POST['stock'];
$price = $_POST['price'];
// Correct concatenation

$sql = "INSERT INTO inventory (item_name, brand, category, stock, price) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Correct type specifiers and added missing variable
$stmt->bind_param("sssii", $item_name, $brand, $category, $stock, $price);

if ($stmt->execute()) {
    $response = ['status' => 'success', 'message' => 'Character added successfully.'];
    echo json_encode($response);
} else {
    $response = ['status' => 'error', 'message' => 'Failed to add character.'];
    echo json_encode($response);
}

$stmt->close();
$conn->close();
?>
