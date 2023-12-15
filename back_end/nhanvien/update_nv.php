<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $manv=$_GET["manv"];
    $tennv=$_GET["tennv"];
    $diachi=$_GET["diachi"];
    $sdt=$_GET["sdt"];
    $email=$_GET["email"];
    $gioitinh=$_GET["gioitinh"];
    $cccd=$_GET["cccd"];
    $sql="UPDATE `nhanvien` SET `tennv`='".$tennv."' ,`diachi`='".$diachi."',`sdt`='".$sdt."',
    `email`='".$email."',`cccd`='".$cccd."',`gioitinh`='".$gioitinh."' WHERE manv='".$manv."'";
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