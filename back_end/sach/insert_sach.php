<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $masach=$_GET["masach"];
    $tensach=$_GET["tensach"];
    $sotrang = $_GET["sotrang"];
    $anhbia = $_GET["anhbia"];
    $ngayXB = $_GET["ngayXB"];
    $giabia = $_GET["giabia"];
    $urlfile = $_GET["urlfile"];
    $makho = $_GET["makho"];
    $macd = $_GET["macd"];
    $manxb = $_GET["manxb"];

    //$sql="insert into sach(masach,tensach) values('".$masach."','".$tensach."')";
    $sql = "INSERT INTO sach(masach, `tensach`, `sotrang`, `anhbia`, `ngayXB`, `giabia`, `urlfile`, `makho`, `macd`, `manxb`) 
    VALUES ('".$masach."','".$tensach."','".$sotrang."','".$anhbia."','".$ngayXB."','".$giabia."','".$urlfile."','".$makho."','".$macd."','".$manxb."')";
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