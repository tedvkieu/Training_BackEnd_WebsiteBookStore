<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $matg=$_GET["matg"];
    $tentg=$_GET["tentg"];
    $diachi=$_GET["diachi"];
    $sdt=$_GET["sdt"];
    $email=$_GET["email"];
    //$anhtg=$_GET["anhtg"];

    //$sql="insert into sach(masach,tensach) values('".$masach."','".$tensach."')";
    $sql = "INSERT INTO `tacgia`(`matg`, `tentg`, `diachi`, `sdt`, `email`) 
    VALUES ('".$matg."','".$tentg."','".$diachi."','".$sdt."','".$email."')";
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