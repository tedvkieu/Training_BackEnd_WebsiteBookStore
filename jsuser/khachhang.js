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
            makh: $(".txtmakh").val(),
            tenkh: $(".txttenkh").val(),
            gioitinh: $(".cbgt").val(),
            ngaysinh: $(".cbns").val(),
            diachi: $(".txtdiachi").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            anhkh: $(".txtanh").val(),
            loaikh: $(".cbloaikh").val()
        }
        console.log(ojdata);
        //ajax
        queryData("back_end/khachhang/insert_kh.php", ojdata, function (res) {
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
            makh: $(".txtmakh").val(),
            tenkh: $(".txttenkh").val(),
            gioitinh: $(".cbgt").val(),
            ngaysinh: $(".cbns").val(),
            diachi: $(".txtdiachi").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            anhkh: $(".txtanh").val(),
            loaikh: $(".cbloaikh").val()

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/khachhang/update_kh.php", ojdata, function (res) {
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
        bootbox.confirm("Bạn có muốn xóa nhà cung cấp này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    makh: $(".txtmakh").val()
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/khachhang/delete_kh.php", ojdata, function (res) {
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
    $(".addListKH").on('click','.click_sua',function(){
        var makh=$(this).parents().attr("data-makh");
        var tenkh = $(this).parents().attr("data-tenkh");
        var diachi=$(this).parents().attr("data-diachi");
        var sdt = $(this).parents().attr("data-sdt");
        var email=$(this).parents().attr("data-email");
        //var anhkh = $(this).parents().attr("data-anhkh");
        var loaikh = $(this).parents().attr("data-loaikh");
        var gioitinh = $(this).parents().attr("data-gioitinh");
        //var ngaysinh=$(this).parents().attr("data-ngaysinh");
        $(".txtmakh").val(makh);
        $(".txttenkh").val(tenkh);
        $(".txtdiachi").val(diachi);
        $(".txtsdt").val(sdt);
        $(".txtemail").val(email);
        //$(".cbngaysinh").val(ngaysinh);
        $(".cbgt").val(gioitinh);
        $(".cbloaikh").val(loaikh);
        //$(".txtanh").val(anhkh);
        

        $(".btnsua").prop("disabled", false);
    })
    $(".btnsua").click(function () {
        $(".btnsua").prop("disabled", true);
        $(".btnluu").prop("disabled", false);
        $(".txttenkh").focus();
        flag = 2;// nguoi dung nhan nut sua
    });
    $(".addListKH").on('click','.click_xoa',function(){
        var makh=$(this).parents().attr("data-makh");
        var tenkh=$(this).parents().attr("data-tenkh");
        
        bootbox.confirm("Bạn có muốn xóa  ["+tenkh+"] này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    makh: makh
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/khachhang/delete_kh.php", ojdata, function (res) {
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
    $(".addListKH").on('click', '.click_anh', function () {
        var anh = $(this).attr("data-anhkh");
        console.log(anh);
        $('.showmodal').modal('show');
        $('.addimage').attr("src", "anhkh/" + anh);

    });
    $(".btnclose").click(function () {
        $('.showmodal').modal('hide');
    });
});
function resetView() {
    $(".txtmakh").val("");
    $(".txttenkh").val("");
    $(".txtdiachi").val("");
    $(".txtsdt").val("");
    $(".txtemail").val("");
    $(".txtanh").val("");
    $(".cbloaikh").val("");
    $(".cbgioitinh").val("");
    $(".cbngaysinh").val("");

    $(".txtmakh").focus();
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
    $(".addListKH").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/khachhang/api_getallkh_search.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if(mang.length==0){
            $(".addListKH").html("<tr><td colspan=4> Không tìm thấy dữ liệu </td></tr>")
        }
        else{
        var body = '';
        console.log(mang);
        for(var i in mang){
        var oj = mang[i] ;
        
        body = body +'<tr>' + 
            '<td>'+(parseInt(i)+1)+'</td>' +
            '<td>' + oj.makh + '</td>' +
            '<td data-anhkh = "'+oj.anhkh+'" class="click_anh"><img class="img-xs rounded-circle" src="anhkh/' + oj.anhkh + '" alt="Profile image"></td>' +
            '<td class="text danger"> ' + oj.tenkh + ' </td>' +
            '<td class="text danger"> ' + oj.gioitinh + ' </td>' +
            '<td class="text danger"> ' + oj.ngaysinh + ' </td>' +
            '<td class="text danger"> ' + oj.email + ' </td>' +
            '<td class="text danger"> ' + oj.sdt + ' </td>' +
            '<td class="text danger"> ' + oj.diachi + ' </td>' +
            '<td class="text danger"> ' + oj.loaikh + ' </td>' +

            '<td data-makh="' + oj.makh + '" data-tenkh="' + oj.tenkh + '" data-ns="' + oj.ngaysinh + '" data-gioitinh="' + oj.gioitinh +
            '" data-diachi="' + oj.diachi + '" data-sdt="' + oj.sdt + '" data-email="' + oj.email + '" data-loaikh="' + oj.loaikh +
            '" data-anhkh="' + oj.anhkh + '" ><label class="badge badge-success click_sua" ><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</label><label class="badge badge-danger click_xoa"><i class="fa fa-minus-circle" aria-hidden="true">&nbsp; Xóa</label></td >'
            '<tr>'
        
        }
        $(".addListKH").html(body);
        }
    });
}

