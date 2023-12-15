<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $makho=$_GET["makho"];
    $tenkho=$_GET["tenkho"];
    $sql="UPDATE `kho` SET `tenkho`='".$tenkho."' WHERE makho='".$makho."'";
    try {  
    if (mysqli_query($conn, $sql)) {
        if(mysqli_affected_rows($conn)>0){         
         $res["success"] = 1; //[1]
        }
        else{
            $res["success"] = 0; //[0] //that bai
        }
    } else {
        $res["success"] = 0; //{success:0}  //that bai
    }   
    }
    catch (Exception $e) {  

        $res["success"] = 0; 
    
    }  
    
    finally {  
    
        mysqli_close($conn);
        echo json_encode($res);
    }  
    
?>