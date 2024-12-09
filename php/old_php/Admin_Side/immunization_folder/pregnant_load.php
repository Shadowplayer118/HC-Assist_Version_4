<?php
include '../connection.php';

$sqlQuery = "Select immunization.immunization_id, patient.first_name, patient.last_name, immunization.administered_date,
immunization.administered_by from immunization inner join patient on immunization.patient_id = patient.patient_id ORDER BY immunization_id DESC";
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
