<?php
include '../../connection.php';

header('Content-Type: application/json'); // Ensure the response is JSON
header('Access-Control-Allow-Origin: *');

$sqlQuery = "Select * from workflow ORDER BY workflow_id DESC";
$result = mysqli_query($conn,$sqlQuery);


if($result->num_rows > 0){
    $data = array();
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
    echo json_encode($data);
}

else{
    echo json_encode([]);
}

$conn->close();


?>



