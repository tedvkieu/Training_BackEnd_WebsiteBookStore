<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $manxb=$_GET["manxb"];
    $tennxb=$_GET["tennxb"];
    $diachi=$_GET["diachi"];
    $sdt=$_GET["sdt"];
    $email=$_GET["email"];
    $anhnxb=$_GET["anhnxb"];
    $kinhdo=$_GET["kinhdo"];
    $vido=$_GET["vido"];
    $sql="UPDATE `nhaxb` SET `tennxb`='".$tennxb."' ,`diachi`='".$diachi."',`sdt`='".$sdt."',
    `email`='".$email."',`anhnxb`='".$anhnxb."',`kinhdo`='".$kinhdo."',`vido`='".$vido."' WHERE manxb='".$manxb."'";
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