<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $makh=$_GET["makh"];
    $tenkh=$_GET["tenkh"];
    $diachi=$_GET["diachi"];
    $sdt=$_GET["sdt"];
    $email=$_GET["email"];
    $anhkh=$_GET["anhkh"];
    $ngaysinh=$_GET["ngaysinh"];
    $loaikh=$_GET["loaikh"];
    $gioitinh=$_GET["gioitinh"];
    //$sql="insert into sach(masach,tensach) values('".$masach."','".$tensach."')";
    $sql = "INSERT INTO `khachhang`(`makh`, `tenkh`, `diachi`, `sdt`, `email`, `anhkh`, `ngaysinh`, `loaikh`, `gioitinh`) 
    VALUES ('".$makh."','".$tenkh."','".$diachi."','".$sdt."','".$email."','".$anhkh."','".$ngaysinh."','".$loaikh."', '".$gioitinh."')";
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