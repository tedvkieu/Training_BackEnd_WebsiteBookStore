<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $makh=$_GET["makh"];
    $tenkh=$_GET["tenkh"];
    $diachi=$_GET["diachi"];
    $sdt=$_GET["sdt"];
    $email=$_GET["email"];
    $gioitinh=$_GET["gioitinh"];
    $loaikh=$_GET["loaikh"];
    $sql="UPDATE `khachhang` SET `tenkh`='".$tenkh."' ,`diachi`='".$diachi."',`sdt`='".$sdt."',
    `email`='".$email."',`loaikh`='".$loaikh."',`gioitinh`='".$gioitinh."' WHERE makh='".$makh."'";
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