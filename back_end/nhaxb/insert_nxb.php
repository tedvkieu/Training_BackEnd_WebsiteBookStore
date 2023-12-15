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
    //$sql="insert into sach(masach,tensach) values('".$masach."','".$tensach."')";
    $sql = "INSERT INTO `nhaxb`(`manxb`, `tennxb`, `diachi`, `sdt`, `email`, `anhnxb`, `kinhdo`, `vido`) 
    VALUES ('".$manxb."','".$tennxb."','".$diachi."','".$sdt."','".$email."','".$anhnxb."','".$kinhdo."','".$vido."')";
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
    echo json_encode($res);//{success:1}  ///đáp trả
    mysqli_close($conn);
?>