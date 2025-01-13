<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include '../../connection.php';

$sqlQuery = "Select contagious_disease.disease_id, patient.first_name, patient.last_name, patient.image,
contagious_disease.diagnosis_date, contagious_disease.disease_status from contagious_disease inner join patient
on contagious_disease.patient_id = patient.patient_id ORDER BY disease_id DESC";
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
