<?php

    require_once("../server.php");
    $sql="SELECT `maNXB`, `tenNXB`, `diachi`, `sdt`, `email`, `anhNXB`, `kinhdo`, `vido` FROM `nhaxb`";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['maNXB']=$rows["maNXB"];
        $usertemp['tenNXB']=$rows["tenNXB"];
        $usertemp['diachi']=$rows["diachi"];
        $usertemp['sdt']=$rows["sdt"];
        $usertemp['email']=$rows["email"];
        $usertemp['anhNXB']=$rows["anhNXB"];
        $usertemp['kinhdo']=$rows["kinhdo"];
        $usertemp['vido']=$rows["vido"];
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>