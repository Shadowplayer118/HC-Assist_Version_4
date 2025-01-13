<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include '../../connection.php';

$sqlQuery = "Select referrals.referral_id, patient.first_name, patient.last_name, patient.image, referrals.referral_date, referrals.description,
 referrals.approval_status from referrals inner join patient on referrals.patient_id = patient.patient_id ORDER BY referral_id DESC";
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
