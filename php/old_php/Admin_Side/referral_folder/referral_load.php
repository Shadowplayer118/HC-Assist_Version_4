<?php
include '../connection.php';

$sqlQuery = "Select referrals.referral_id, patient.first_name, patient.last_name, referrals.referral_date,
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
