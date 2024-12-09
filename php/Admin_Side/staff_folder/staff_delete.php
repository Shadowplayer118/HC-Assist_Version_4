<?php
include '../connection.php';

if(isset($_POST['id']) && is_numeric($_POST['id'])){

    $id = $_POST['id'];

    $sql = "DELETE FROM staff WHERE staff_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i",$id);

    if($stmt->execute()){
        $response = ['status'=>'success', 'message'=>'Character deleted successfully.'];
        echo json_encode($response);
    }
    else{
        $response = ['status'=>'error', 'message'=>'Failed to delete character.'];
        echo json_encode($response);
    }

    $stmt->close();
}
    else{
        $response = ['status'=>'error','message'=>'Invalid Character ID.'];
        echo json_encode($response);
    }

    $conn->close();

?>