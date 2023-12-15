<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $sql="SELECT * FROM `nhanvien` WHERE (manv like '%".$s."%' or  tennv like '%".$s."%' or  diachi like '%".$s."%' or  sdt like '%".$s."%' or  email like '%".$s."%'
    or  gioitinh like '%".$s."%' or  ngaysinh like '%".$s."%' or cccd like '%".$s."%')";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['manv']=$rows["manv"];
        $usertemp['tennv']=$rows["tennv"];
        $usertemp['diachi']=$rows["diachi"];
        $usertemp['gioitinh']=$rows["gioitinh"];
        $usertemp['ngaysinh']=$rows["ngaysinh"];
        $usertemp['sdt']=$rows["sdt"];
        $usertemp['email']=$rows["email"];
        $usertemp['cccd']=$rows["cccd"];
        $usertemp['anhnv']=$rows["anhnv"];
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>
