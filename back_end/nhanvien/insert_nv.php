<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $manv=$_GET["manv"];
    $tennv=$_GET["tennv"];
    $diachi=$_GET["diachi"];
    $sdt=$_GET["sdt"];
    $email=$_GET["email"];
    $anhnv=$_GET["anhnv"];
    $ngaysinh=$_GET["ngaysinh"];
    $cccd=$_GET["cccd"];
    $gioitinh=$_GET["gioitinh"];
    //$sql="insert into sach(masach,tensach) values('".$masach."','".$tensach."')";
    $sql = "INSERT INTO `nhanvien`(`manv`, `tennv`, `diachi`, `sdt`, `email`, `anhnv`, `ngaysinh`, `cccd`, `gioitinh`) 
    VALUES ('".$manv."','".$tennv."','".$diachi."','".$sdt."','".$email."','".$anhnv."','".$ngaysinh."','".$cccd."', '".$gioitinh."')";
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