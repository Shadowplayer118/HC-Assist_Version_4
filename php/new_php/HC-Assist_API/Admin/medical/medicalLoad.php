<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
include '../../connection.php';

        $sqlQuery = "Select patient.first_name, patient.last_name, patient.middle_name, medical_record.weight,
                    medical_record.height, medical_record.temperature, medical_record.blood_pressure,
                    medical_record.heart_rate, medical_status, medical_id, patient.patient_id, image
                    from patient 
                    inner join medical_record
                    on patient.patient_id = medical_record.patient_id
                    ORDER BY patient.patient_id DESC";
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



