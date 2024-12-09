        <?php
        include '../connection.php';

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



