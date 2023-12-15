<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $page=$_GET["page"];
    $record=$_GET["record"];
    $vt= $page*$record;
    $limit='limit '.$vt.','.$record;
    $sql="SELECT a.masach, a.tensach, a.sotrang, a.anhbia, a.ngayXB, a.giabia, a.urlfile, k.tenkho, cd.tencd, xb.tennxb 
    FROM sach a, chude cd, nhaxb xb, kho k 
    WHERE a.macd=cd.macd and a.makho=k.makho and a.manxb=xb.manxb and (a.masach like '%".$s."%' or a.tensach like '%".$s."%'
        or a.sotrang like '%".$s."%' or a.ngayXB like '%".$s."%' or a.giabia like '%".$s."%' or a.urlfile like '%".$s."%'
        or k.tenkho like '%".$s."%' or cd.tencd like '%".$s."%' or xb.tennxb like '%".$s."%') ".$limit;   
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $sqltotal="select count(*) as total FROM sach a,chude cd,nhaxb xb,kho k 
    where a.macd=cd.macd and a.makho=k.makho and a.manxb=xb.manxb and a.tensach like '%".$s."%' ";
    $rstotal=mysqli_query($conn,$sqltotal);

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
    $row=mysqli_fetch_array($rstotal);
    $jsondata['totalpage'] =ceil($row["total"]/$record);
    $jsondata['total'] =(int)$row["total"];
    $jsondata['record'] =$record;
    $jsondata['page'] =(int)$page;
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>
