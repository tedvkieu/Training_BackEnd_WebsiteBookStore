<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $matg=$_GET["matg"];
    $tentg=$_GET["tentg"];
    $diachi=$_GET["diachi"];
    $sdt=$_GET["sdt"];
    $email=$_GET["email"];
    $sql="UPDATE `tacgia` SET `tentg`='".$tentg."' ,`diachi`='".$diachi."',`sdt`='".$sdt."',
    `email`='".$email."' WHERE matg='".$matg."'";
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