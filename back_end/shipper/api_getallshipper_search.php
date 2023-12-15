<?php
    require_once("../server.php");
    $s=$_GET["search"];
    $sql="SELECT * FROM `shipper` WHERE (masp like '%".$s."%' or  tensp like '%".$s."%' or  anhsp like '%".$s."%'
    or  sdt like '%".$s."%' or  email like '%".$s."%')";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['masp']=$rows["masp"];
        $usertemp['tensp']=$rows["tensp"];
        $usertemp['anhsp']=$rows["anhsp"];
        $usertemp['sdt']=$rows["sdt"];
        $usertemp['email']=$rows["email"];
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>
