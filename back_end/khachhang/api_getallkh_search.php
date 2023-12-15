<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $sql="SELECT * FROM `khachhang` WHERE (makh like '%".$s."%' or  tenkh like '%".$s."%' or  diachi like '%".$s."%' or  sdt like '%".$s."%' or  email like '%".$s."%'
    or  gioitinh like '%".$s."%' or  ngaysinh like '%".$s."%' or loaikh like '%".$s."%')";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['makh']=$rows["makh"];
        $usertemp['tenkh']=$rows["tenkh"];
        $usertemp['diachi']=$rows["diachi"];
        $usertemp['sdt']=$rows["sdt"];
        $usertemp['email']=$rows["email"];
        $usertemp['anhkh']=$rows["anhkh"];
        $usertemp['loaikh']=$rows["loaikh"];
        $usertemp['gioitinh']=$rows["gioitinh"];
        $usertemp['ngaysinh']=$rows["ngaysinh"];
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>
