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
            masp: $(".txtmasp").val(),
            tensp: $(".txttensp").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            anhsp: $(".txtanh").val()
        }
        console.log(ojdata);
        //ajax
        queryData("back_end/shipper/insert_shipper.php", ojdata, function (res) {
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
            masp: $(".txtmasp").val(),
            tensp: $(".txttensp").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            anhsp: $(".txtanh").val()

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/shipper/update_shipper.php", ojdata, function (res) {
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
        bootbox.confirm("Bạn có muốn xóa chủ đề này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    masp: $(".txtmasp").val()
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/shipper/delete_shipper.php", ojdata, function (res) {
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
    $(".addListSP").on('click','.click_sua',function(){
        var masp=$(this).parents().attr("data-masp");
        var tensp = $(this).parents().attr("data-tensp");

        var sdt = $(this).parents().attr("data-sdt");
        var email=$(this).parents().attr("data-email");

        $(".txtmasp").val(masp);
        $(".txttensp").val(tensp);
        $(".txtsdt").val(sdt);
        $(".txtemail").val(email);


        $(".btnsua").prop("disabled", false);
    })
    $(".btnsua").click(function () {
        $(".btnsua").prop("disabled", true);
        $(".btnluu").prop("disabled", false);
        $(".txttensp").focus();
        flag = 2;// nguoi dung nhan nut sua
    });
    $(".addListSP").on('click','.click_xoa',function(){
        var masp=$(this).parents().attr("data-masp");
        var tensp=$(this).parents().attr("data-tensp");
        
        bootbox.confirm("Bạn có muốn xóa  ["+tensp+"] này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    masp: masp
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/shipper/delete_shipper.php", ojdata, function (res) {
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
    $(".addListSP").on('click', '.click_anh', function () {
        var anh = $(this).attr("data-anhsp");
        console.log(anh);
        $('.showmodal').modal('show');
        $('.addimage').attr("src", "anhshipper/" + anh);

    });
    $(".btnclose").click(function () {
        $('.showmodal').modal('hide');
    });
});
function resetView() {
    $(".txtmasp").val("");
    $(".txttensp").val("");

    $(".txtsdt").val("");
    $(".txtemail").val("");

    $(".txtmasp").focus();
}
function khoitao() {
    $(".btnthem").prop("disabled", false);//sang
    $(".btnsua").prop("disabled", true);
    $(".btnluu").prop("disabled", true);
}
function loadData(s) {
    var ojdata = {
        search : s
    }
    $(".addListSP").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/shipper/api_getallshipper_search.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if(mang.length==0){
            $(".addListSP").html("<tr><td colspan=4> Không tìm thấy dữ liệu </td></tr>")
        }
        else{
        var body = '';
        console.log(mang);
        for(var i in mang){
        var oj = mang[i] ;
        
        body = body +'<tr>' + 
            '<td>'+(parseInt(i)+1)+'</td>' +
            '<td>' + oj.masp + '</td>' +
            '<td data-anhsp = "'+oj.anhsp+'" class="click_anh"><img class="img-xs rounded-circle" src="anhshipper/' + oj.anhsp + '" alt="Profile image"></td>' +
            '<td class="text danger"> ' + oj.tensp + ' </td>' +
            '<td class="text danger"> ' + oj.email + ' </td>' +
            '<td class="text danger"> ' + oj.sdt + ' </td>' +
            
            '<td data-masp="' + oj.masp + '" data-tensp="' + oj.tensp + '" data-sdt="' + oj.sdt +
            '" data-email="' + oj.email + '" data-anhsp="' + oj.anhsp +
            '" ><label class="badge badge-success click_sua" ><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</label><label class="badge badge-danger click_xoa"><i class="fa fa-minus-circle" aria-hidden="true">&nbsp; Xóa</label></td >'
            '<tr>'
        
        }
        $(".addListSP").html(body);
        }
    });
}

