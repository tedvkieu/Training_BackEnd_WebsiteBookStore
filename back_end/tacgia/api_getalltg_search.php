<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $sql="SELECT * FROM `tacgia` WHERE (matg like '%".$s."%' or  tentg like '%".$s."%' or diachi like '%".$s."%' or  sdt like '%".$s."%'
    or email like '%".$s."%')";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['matg']=$rows["matg"];
        $usertemp['tentg']=$rows["tentg"];
        $usertemp['diachi']=$rows["diachi"];
        $usertemp['sdt']=$rows["sdt"];
        $usertemp['email']=$rows["email"];
        $usertemp['anhtg']=$rows["anhtg"];

        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>
