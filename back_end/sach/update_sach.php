<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $masach=$_GET["masach"];
    $tensach=$_GET["tensach"];
    $sotrang = $_GET["sotrang"];
    //$anhbia = $_GET["anhbia"];
    //$ngayXB = $_GET["ngayXB"];
    $giabia = $_GET["giabia"];
    $urlfile = $_GET["urlfile"];
    $makho = $_GET["makho"];
    $macd = $_GET["macd"];
    $manxb = $_GET["manxb"];

    //$sql="UPDATE `sach` SET `tensach`='".$tensach."' WHERE masach='".$masach."'";
    $sql = "UPDATE `sach` SET `tensach`='".$tensach."',`sotrang`='".$sotrang."',
    `giabia`='".$giabia."',`urlfile`='".$urlfile."', `manxb`='".$manxb."', `makho`='".$makho."',`macd`='".$macd."'
    WHERE masach='".$masach."'or (makho='".$makho."'and macd='".$macd."'and manxb='".$manxb."')";
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