$(document).ready(function () {

    var flag =0;// chua thao tac
    var s=$(".txtsearch").val();
    loadData(s);

    khoitao();
    console.log("ok")
    $(".btnlamlai").click(function () {
        console.log("Click lam lai ok")

        resetView();
        khoitao();
    })

    $(".btnthem").click(function () {
        $(".btnthem").prop("disabled", true);
        $(".btnluu").prop("disabled", false);

        resetView();
        flag=1;// nguoi dung nhan nut them
    });

    $(".btnluu").click(function () {
        if(flag==1){
        $(".btnthem").prop("disabled", true);//sáng
        $(".btnluu").prop("disabled", true);
        //Chuẩn bị dữ liệu để gửi lên server
        var ojdata = {
            manv: $(".txtmanv").val(),
            tennv: $(".txttennv").val(),
            gioitinh: $(".cbgt").val(),
            ngaysinh: $(".cbns").val(),
            diachi: $(".txtdiachi").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            anhnv: $(".txtanh").val(),
            cccd: $(".txtcccd").val()
        }
        console.log(ojdata);
        //ajax
        queryData("back_end/nhanvien/insert_nv.php", ojdata, function (res) {
            console.log(res);
            if (res.success == 1) {
                // alert("Insert Thành công");
                bootbox.alert("Insert Thành công!");
                loadData(s);
            } else {
                //alert("Insert không Thành công");
                bootbox.alert("Insert không Thành công!");
            }
        });
    }else if(flag==2){
        $(".btnthem").prop("disabled", true);//sáng
        $(".btnluu").prop("disabled", true);
        var ojdata = {
            manv: $(".txtmanv").val(),
            tennv: $(".txttennv").val(),
            gioitinh: $(".cbgt").val(),
            ngaysinh: $(".cbns").val(),
            diachi: $(".txtdiachi").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            anhnv: $(".txtanh").val(),
            cccd: $(".txtcccd").val()

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/nhanvien/update_nv.php", ojdata, function (res) {
            console.log(res);
            if (res.success == 1) {
                bootbox.alert("Update Thành công!");
                loadData(s);
            } else {
                bootbox.alert("Update không Thành công!");
            }
        });
    }
    });

    $(".btnxoa").click(function () {
        bootbox.confirm("Bạn có muốn xóa nhân viên này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    manv: $(".txtmanv").val()
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/nhanvien/delete_nv.php", ojdata, function (res) {
                    console.log(res);
                    if (res.success == 1) {
                        bootbox.alert("Xóa Thành công");
                        loadData(s);
                    } else {
                        bootbox.alert("Xóa không Thành công");
                    }
                });
            }
        });
    })
    $(".btnsearch").click(function () {
        var s=$(".txtsearch").val();
        console.log(s);
        loadData(s);
    })
    $(".txtsearch").keyup(function(){
        var s=$(".txtsearch").val();
        console.log(s);
        loadData(s);
    });
    $(".addListNV").on('click','.click_sua',function(){
        var manv=$(this).parents().attr("data-manv");
        var tennv = $(this).parents().attr("data-tennv");
        var diachi=$(this).parents().attr("data-diachi");
        var sdt = $(this).parents().attr("data-sdt");
        var email=$(this).parents().attr("data-email");
        var cccd = $(this).parents().attr("data-cccd");
        var gioitinh = $(this).parents().attr("data-gioitinh");
 
        $(".txtmanv").val(manv);
        $(".txttennv").val(tennv);
        $(".txtdiachi").val(diachi);
        $(".txtsdt").val(sdt);
        $(".txtemail").val(email);
        $(".cbgt").val(gioitinh);
        $(".txtcccd").val(cccd);
 
        

        $(".btnsua").prop("disabled", false);
    })
    $(".btnsua").click(function () {
        $(".btnsua").prop("disabled", true);
        $(".btnluu").prop("disabled", false);
        $(".txttennv").focus();
        flag = 2;// nguoi dung nhan nut sua
    });
    $(".addListNV").on('click','.click_xoa',function(){
        var manv=$(this).parents().attr("data-manv");
        var tennv=$(this).parents().attr("data-tennv");
        
        bootbox.confirm("Bạn có muốn xóa  ["+tennv+"] này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    manv: manv
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/nhanvien/delete_nv.php", ojdata, function (res) {
                    console.log(res);
                    if (res.success == 1) {
                        bootbox.alert("Xóa Thành công");
                        loadData(s);
                    } else {
                        bootbox.alert("Xóa không Thành công");
                    }
                });
            }
        });
    })
    $(".addListNV").on('click', '.click_anh', function () {
        var anh = $(this).attr("data-anhnv");
        console.log(anh);
        $('.showmodal').modal('show');
        $('.addimage').attr("src", "anhnv/" + anh);

    });
    $(".btnclose").click(function () {
        $('.showmodal').modal('hide');
    });
});
function resetView() {
    $(".txtmanv").val("");
    $(".txttennv").val("");
    $(".txtdiachi").val("");
    $(".txtsdt").val("");
    $(".txtemail").val("");
    $(".txtanh").val("");
    $(".txtcccd").val("");
    $(".cbgt").val("");
    $(".cbns").val("");

    $(".txtmanv").focus();
}
function khoitao() {
    $(".btnthem").prop("disabled", false);//sang
    $(".btnsua").prop("disabled", true);
    $(".btnluu").prop("disabled", true);
}
function loadData(s) {
    var ojdata = {
        search:s
    }
    $(".addListNV").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/nhanvien/api_getallnv_search.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if(mang.length==0){
            $(".addListNV").html("<tr><td colspan=4> Không tìm thấy dữ liệu </td></tr>")
        }
        else{
        var body = '';
        console.log(mang);
        for(var i in mang){
        var oj = mang[i] ;
        
        body = body +'<tr>' + 
            '<td>'+(parseInt(i)+1)+'</td>' +
            '<td>' + oj.manv + '</td>' +
            '<td data-anhnv = "'+oj.anhnv+'" class="click_anh"><img class="img-xs rounded-circle" src="anhnv/' + oj.anhnv + '" alt="Profile image"></td>' +
            '<td class="text danger"> ' + oj.tennv + ' </td>' +
            '<td class="text danger"> ' + oj.gioitinh + ' </td>' +
            '<td class="text danger"> ' + oj.ngaysinh + ' </td>' +
            '<td class="text danger"> ' + oj.diachi + ' </td>' +
            '<td class="text danger"> ' + oj.email + ' </td>' +
            '<td class="text danger"> ' + oj.sdt + ' </td>' +
            '<td class="text danger"> ' + oj.cccd + ' </td>' +
            '<td data-manv="' + oj.manv + '" data-tennv="' + oj.tennv + '" data-ns="' + oj.ngaysinh + '" data-gioitinh="' + oj.gioitinh +
            '" data-diachi="' + oj.diachi + '" data-sdt="' + oj.sdt + '" data-email="' + oj.email + '" data-cccd="' + oj.cccd +
            '" data-anhnv="' + oj.anhnv + '" ><label class="badge badge-success click_sua" ><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</label><label class="badge badge-danger click_xoa"><i class="fa fa-minus-circle" aria-hidden="true">&nbsp; Xóa</label></td >'
            '<tr>'
        
        }
        $(".addListNV").html(body);
        }
    });
}

