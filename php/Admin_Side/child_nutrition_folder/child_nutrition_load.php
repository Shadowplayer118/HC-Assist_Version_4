<?php
include '../connection.php';

$sqlQuery = "Select child_nutrition.child_id, patient.first_name, patient.last_name, child_nutrition.child_status, 
child_nutrition.guardian from child_nutrition inner join patient on child_nutrition.patient_id = patient.patient_id ORDER BY child_id DESC";
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
