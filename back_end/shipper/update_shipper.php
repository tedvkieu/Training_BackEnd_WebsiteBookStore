<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $masp=$_GET["masp"];
    $tensp=$_GET["tensp"];
    $sdt=$_GET["sdt"];
    $email=$_GET["email"];
    $sql="UPDATE `shipper` SET `tensp`='".$tensp."',`sdt`='".$sdt."',
    `email`='".$email."' WHERE masp='".$masp."'";
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