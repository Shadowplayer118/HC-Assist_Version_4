<?php

include '../connection.php';

// Check if the 'id' parameter is set in the GET request
// if (!isset($_GET['id'])) {
//     echo json_encode(['error' => 'ID parameter missing']);
//     exit;
// }

// $inventory_id = intval($_GET['id']); // Securely get and cast the 'id' parameter to an integer
$inventory_id = 4; 
// SQL query with a placeholder for the staff ID
$sql = "SELECT inventory_id, item_name, brand, category, stock, price FROM inventory WHERE inventory_id = ?";
$stmt = $conn->prepare($sql);

// Check if the statement was prepared successfully
if ($stmt === false) {
    echo json_encode(['error' => 'Failed to prepare statement']);
    exit;
}
// Bind the parameter to the statement
$stmt->bind_param("i", $inventory_id);

// Execute the prepared statement
$stmt->execute();

// Bind the result variables
$stmt->bind_result($inventory_id, $item_name, $brand, $category, $stock, $price);

// Fetch the results and output them as a JSON object
if ($stmt->fetch()) {
    echo json_encode([
        'inventory_id' => $inventory_id,
        'item_name' => $item_name,
        'brand' => $brand,
        'category' => $category,
        'stock' => $stock,
        'price' => $price,
       
    ]);
} else {
    echo json_encode(['error' => 'Staff not found']);
}

// Close the statement and the database connection
$stmt->close();
$conn->close();

?>
