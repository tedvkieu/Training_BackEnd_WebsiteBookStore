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
            mancc: $(".txtmancc").val(),
            tenncc: $(".txttenncc").val(),
            diachi: $(".txtdiachi").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            msthue: $(".txtmsthue").val()
        }
        console.log(ojdata);
        //ajax
        queryData("back_end/nhacc/insert_ncc.php", ojdata, function (res) {
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
            mancc: $(".txtmancc").val(),
            tenncc: $(".txttenncc").val(),
            diachi: $(".txtdiachi").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            msthue: $(".txtmsthue").val()

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/nhacc/update_ncc.php", ojdata, function (res) {
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
                    mancc: $(".txtmancc").val()
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/nhacc/delete_ncc.php", ojdata, function (res) {
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
    $(".addListNCC").on('click','.click_sua',function(){
        var mancc=$(this).parents().attr("data-mancc");
        var tenncc = $(this).parents().attr("data-tenncc");
        var diachi=$(this).parents().attr("data-diachi");
        var sdt = $(this).parents().attr("data-sdt");
        var email=$(this).parents().attr("data-email");
        var msthue=$(this).parents().attr("data-msthue");
        $(".txtmancc").val(mancc);
        $(".txttenncc").val(tenncc);
        $(".txtdiachi").val(diachi);
        $(".txtsdt").val(sdt);
        $(".txtemail").val(email);
        $(".txtmsthue").val(msthue);
        

        $(".btnsua").prop("disabled", false);
    })
    $(".btnsua").click(function () {
        $(".btnsua").prop("disabled", true);
        $(".btnluu").prop("disabled", false);
        $(".txttenncc").focus();
        flag = 2;// nguoi dung nhan nut sua
    });
    $(".addListNCC").on('click','.click_xoa',function(){
        var mancc=$(this).parents().attr("data-mancc");
        var tenncc=$(this).parents().attr("data-tenncc");
        
        bootbox.confirm("Bạn có muốn xóa  ["+tenncc+"] này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    mancc: mancc
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/nhacc/delete_ncc.php", ojdata, function (res) {
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
});
function resetView() {
    $(".txtmancc").val("");
    $(".txttenncc").val("");
    $(".txtdiachi").val("");
    $(".txtsdt").val("");
    $(".txtemail").val("");
    $(".txtkd").val("");
    $(".txtmsthue").val("");
    $(".txtmancc").focus();
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
    $(".addListNCC").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/nhacc/api_getallncc_search.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if(mang.length==0){
            $(".addListNCC").html("<tr><td colspan=4> Không tìm thấy dữ liệu </td></tr>")
        }
        else{
        var body = '';
        console.log(mang);
        for(var i in mang){
        var oj = mang[i] ;
        
        body = body +'<tr>' + 
            '<td>'+(parseInt(i)+1)+'</td>' +
            '<td>'+oj.mancc+'</td>' +
            '<td class="text danger"> ' + oj.tenncc + ' </td>' +
            '<td class="text danger"> ' + oj.email + ' </td>' +
            '<td class="text danger"> ' + oj.sdt + ' </td>' +
            '<td class="text danger"> ' + oj.diachi + ' </td>' +
            '<td class="text danger"> ' + oj.msthue + ' </td>' +
            '<td data-mancc="' + oj.mancc + '" data-tenncc="' + oj.tenncc + '" data-diachi="' + oj.diachi + '" data-sdt="' + oj.sdt +
            '" data-email="' + oj.email + '" data-msthue="' + oj.msthue +
            '"><label class="badge badge-success click_sua" ><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</label><label class="badge badge-danger click_xoa"><i class="fa fa-minus-circle" aria-hidden="true">&nbsp; Xóa</label></td >'
            '<tr>'
        
        }
        $(".addListNCC").html(body);
        }
    });
}

