        <?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
include '../../connection.php';

        $sqlQuery = "Select * from patient ORDER BY patient_id DESC";
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



