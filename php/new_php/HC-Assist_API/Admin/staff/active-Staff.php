<?php
include '../../connection.php';

// Allow cross-origin requests from any domain (for development purposes, you can specify a domain instead of '*')
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST");

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $staff_id = $_POST['staff_id'] ?? '';
    $first_name = $_POST['first_name'] ?? '';
    $middle_name = $_POST['middle_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $age = $_POST['age'] ?? '';
    $birth_date = $_POST['birth_date'] ?? '';
    $gender = $_POST['gender'] ?? '';
    $civil_status = $_POST['civil_status'] ?? '';
    $contact_number = $_POST['contact_number'] ?? '';
    $purok_assigned = $_POST['purok_assigned'] ?? '';
    $password = $_POST['password'] ?? '';
    $position = $_POST['position'] ?? '';
    $isActive = $_POST['isActive'] ?? '';



    // Image upload handling
if($isActive==1){
    $sql = "UPDATE staff SET isActive=0 WHERE staff_id=?";
}

else{
    $sql = "UPDATE staff SET isActive=1 WHERE staff_id=?";
}

    // Prepare SQL query
   

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $staff_id);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database insertion failed."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Prepared statement failed."]);
    }

    $conn->close();
}
?>
