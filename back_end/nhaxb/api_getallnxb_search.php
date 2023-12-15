<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $sql="SELECT * FROM `nhaxb` WHERE (manxb like '%".$s."%' or  tennxb like '%".$s."%' or  diachi like '%".$s."%' or  sdt like '%".$s."%' or  email like '%".$s."%'
    or  kinhdo like '%".$s."%' or  vido like '%".$s."%')";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['manxb']=$rows["manxb"];
        $usertemp['tennxb']=$rows["tennxb"];
        $usertemp['diachi']=$rows["diachi"];
        $usertemp['sdt']=$rows["sdt"];
        $usertemp['email']=$rows["email"];
        $usertemp['anhnxb']=$rows["anhnxb"];
        $usertemp['kinhdo']=$rows["kinhdo"];
        $usertemp['vido']=$rows["vido"];
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>
