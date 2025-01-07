<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../../connection.php';

if ($conn->connect_error) {
    die(json_encode(['message' => 'Database connection failed']));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $item_name = $_POST['item_name'];
    $brand = $_POST['brand'];
    $category = $_POST['category'];
    $stock = $_POST['stock'];
    $price = $_POST['price'];
    $expiration = isset($_POST['expiration']) ? $_POST['expiration'] : null;
    $imagePath = null;

    if (isset($_FILES['image'])) {
        $currentDateTime = date('YmdHis'); // Format: YYYYMMDDHHMMSS
        
        // Generate a 5-character random string
        $randomCode = bin2hex(random_bytes(3)); // 3 bytes = 6 characters in hex, but we'll use 5 characters
        $randomCode = substr($randomCode, 0, 5); // Take only the first 5 characters

        // Construct the filename with current date-time and random 5-character code
        $imageFileName = "medicineImage" . $currentDateTime . $randomCode . '.' . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        
        $targetPath = "../../../../uploads/$imageFileName";

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $imagePath = "/uploads/$imageFileName";
        } else {
            $imagePath = '';
        }
    } else {
        $imagePath = '';
    }

    // Add to 'inventory' table
    $stmt = $conn->prepare("INSERT INTO inventory (item_name, brand, category, stock, price, image) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssids", $item_name, $brand, $category, $stock, $price, $imagePath);
    if ($stmt->execute()) {
        $inventory_id = $conn->insert_id;

        if ($expiration) {
            // Add to 'expirations' table
            $stmt_exp = $conn->prepare("INSERT INTO expirations (actionTaken, stocked, inventory_id, expiration_date, isViewed) VALUES ('None', ?, ?, ?, 0)");
            $stmt_exp->bind_param("sis", $stock, $inventory_id, $expiration);
            $stmt_exp->execute();
            $stmt_exp->close();
        }

        echo json_encode('success');
    } else {
        echo json_encode(['message' => 'Failed to add inventory']);
    }
    $stmt->close();
}

$conn->close();
?>
