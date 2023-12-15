<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $masp=$_GET["masp"];
    $tensp=$_GET["tensp"];
    $anhsp=$_GET["anhsp"];
    $sdt=$_GET["sdt"];
    $email=$_GET["email"];

    //$sql="insert into sach(masach,tensach) values('".$masach."','".$tensach."')";
    $sql = "INSERT INTO `shipper`(`masp`, `tensp`, `anhsp`, `sdt`, `email`) 
    VALUES ('".$masp."','".$tensp."','".$anhsp."','".$sdt."','".$email."')";
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