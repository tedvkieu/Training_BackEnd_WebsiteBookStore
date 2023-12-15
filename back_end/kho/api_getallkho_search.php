<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $sql="SELECT `makho`, `tenkho` FROM `kho` where (makho like '%".$s."%' or  tenkho like '%".$s."%')";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['makho']=$rows["makho"];
        $usertemp['tenkho']=$rows["tenkho"];
       
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>