<?php

    require_once("../server.php");
    $s=$_GET["search"];
    //$sql="SELECT * FROM `sach` WHERE (masach like '%".$s."%' or  tensach like '%".$s."%')";
    $sql="SELECT a.masach, a.tensach, a.sotrang, a.anhbia, a.ngayXB, a.giabia, a.urlfile, k.tenkho, cd.tencd, xb.tennxb 
        FROM sach a, chude cd, nhaxb xb, kho k 
        where a.macd = cd.macd and a.makho = k.makho and a.manxb = xb.manxb and (a.masach like '%".$s."%' or a.tensach like '%".$s."%'
        or a.sotrang like '%".$s."%' or a.ngayXB like '%".$s."%' or a.giabia like '%".$s."%' or a.urlfile like '%".$s."%'
        or k.tenkho like '%".$s."%' or cd.tencd like '%".$s."%' or xb.tennxb like '%".$s."%') ";

    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['masach']=$rows["masach"];
        $usertemp['tensach']=$rows["tensach"];
        $usertemp['tenkho']=$rows["tenkho"];
        $usertemp['tencd']=$rows["tencd"];
        $usertemp['tennxb']=$rows["tennxb"];
        $usertemp['sotrang']=$rows["sotrang"];
        $usertemp['ngayXB']=$rows["ngayXB"];
        $usertemp['giabia']=$rows["giabia"];
        $usertemp['urlfile']=$rows["urlfile"];
        $usertemp['anhbia']=$rows["anhbia"];
        
       
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>
