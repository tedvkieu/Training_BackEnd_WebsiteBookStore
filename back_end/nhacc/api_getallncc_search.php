<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $sql="SELECT * FROM `nhacungcap` WHERE (mancc like '%".$s."%' or  tenncc like '%".$s."%' or  diachi like '%".$s."%' or  sdt like '%".$s."%' or  email like '%".$s."%'
    or  msthue like '%".$s."%')";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['mancc']=$rows["mancc"];
        $usertemp['tenncc']=$rows["tenncc"];
        $usertemp['diachi']=$rows["diachi"];
        $usertemp['sdt']=$rows["sdt"];
        $usertemp['email']=$rows["email"];
        $usertemp['msthue']=$rows["msthue"];
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>
