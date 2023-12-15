<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $mancc=$_GET["mancc"];
    $tenncc=$_GET["tenncc"];
    $diachi=$_GET["diachi"];
    $sdt=$_GET["sdt"];
    $email=$_GET["email"];

    $msthue=$_GET["msthue"];
    //$sql="insert into sach(masach,tensach) values('".$masach."','".$tensach."')";
    $sql = "INSERT INTO `nhacungcap`(`mancc`, `tenncc`, `diachi`, `sdt`, `email`, `msthue`) 
    VALUES ('".$mancc."','".$tenncc."','".$diachi."','".$sdt."','".$email."','".$msthue."')";
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