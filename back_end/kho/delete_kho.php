<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $makho=$_GET["makho"];
    $sql="DELETE FROM `kho` WHERE makho='".$makho."'";
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