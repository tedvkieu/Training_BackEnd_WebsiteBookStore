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
            manxb: $(".txtmanxb").val(),
            tennxb: $(".txttennxb").val(),
            diachi: $(".txtdiachi").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            anhnxb: $(".txtanh").val(),
            kinhdo: $(".txtkd").val(),
            vido: $(".txtvd").val()
        }
        console.log(ojdata);
        //ajax
        queryData("back_end/nhaxb/insert_nxb.php", ojdata, function (res) {
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
            manxb: $(".txtmanxb").val(),
            tennxb: $(".txttennxb").val(),
            diachi: $(".txtdiachi").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            anhnxb: $(".txtanh").val(),
            kinhdo: $(".txtkd").val(),
            vido: $(".txtvd").val()

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/nhaxb/update_nxb.php", ojdata, function (res) {
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
                    manxb: $(".txtmanxb").val()
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/nhaxb/delete_nxb.php", ojdata, function (res) {
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
    $(".addListNXB").on('click','.click_sua',function(){
        var manxb=$(this).parents().attr("data-manxb");
        var tennxb = $(this).parents().attr("data-tennxb");
        var diachi=$(this).parents().attr("data-diachi");
        var sdt = $(this).parents().attr("data-sdt");
        var email=$(this).parents().attr("data-email");
        var anhnxb = $(this).parents().attr("data-anhnxb");
        var kinhdo=$(this).parents().attr("data-kinhdo");
        var vido=$(this).parents().attr("data-vido");
        $(".txtmanxb").val(manxb);
        $(".txttennxb").val(tennxb);
        $(".txtdiachi").val(diachi);
        $(".txtsdt").val(sdt);
        $(".txtemail").val(email);
        $(".txtanh").val(anhnxb);
        $(".txtkd").val(kinhdo);
        $(".txtvd").val(vido);

        $(".btnsua").prop("disabled", false);
    })
    $(".btnsua").click(function () {
        $(".btnsua").prop("disabled", true);
        $(".btnluu").prop("disabled", false);
        $(".txttennxb").focus();
        flag = 2;// nguoi dung nhan nut sua
    });
    $(".addListNXB").on('click','.click_xoa',function(){
        var manxb=$(this).parents().attr("data-manxb");
        var tennxb=$(this).parents().attr("data-tennxb");
        
        bootbox.confirm("Bạn có muốn xóa  ["+tennxb+"] này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    manxb: manxb
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/nhaxb/delete_nxb.php", ojdata, function (res) {
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
    $(".addListNXB").on('click', '.click_anh', function () {
        var anh = $(this).attr("data-anhnxb");
        console.log(anh);
        $('.showmodal').modal('show');
        $('.addimage').attr("src", "anhnxb/" + anh);

    });
    $(".btnclose").click(function () {
        $('.showmodal').modal('hide');
    });
});
function resetView() {
    $(".txtmanxb").val("");
    $(".txttennxb").val("");
    $(".txtdiachi").val("");
    $(".txtsdt").val("");
    $(".txtemail").val("");
    $(".txtanh").val("");
    $(".txtkd").val("");
    $(".txtvd").val("");
    $(".txtmanxb").focus();
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
    $(".addListNXB").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/nhaxb/api_getallnxb_search.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if(mang.length==0){
            $(".addListNXB").html("<tr><td colspan=4> Không tìm thấy dữ liệu </td></tr>")
        }
        else{
        var body = '';
        console.log(mang);
        for(var i in mang){
        var oj = mang[i] ;
        
        body = body +'<tr>' + 
            '<td>'+(parseInt(i)+1)+'</td>' +
            '<td>' + oj.manxb + '</td>' +
            '<td data-anhnxb = "'+oj.anhnxb+'" class="click_anh"><img class="img-xs rounded-circle" src="anhnxb/' + oj.anhnxb + '" alt="Profile image"></td>' +
            '<td class="text danger"> ' + oj.tennxb + ' </td>' +
            '<td class="text danger"> ' + oj.diachi + ' </td>' +
            '<td class="text danger"> ' + oj.sdt + ' </td>' +
            '<td class="text danger"> ' + oj.email + ' </td>' +
            '<td class="text danger"> ' + oj.kinhdo + ' </td>' +
            '<td class="text danger"> ' + oj.vido + ' </td>' +
            
            '<td data-manxb="' + oj.manxb + '" data-tennxb="' + oj.tennxb + '" data-diachi="' + oj.diachi + '" data-sdt="' + oj.sdt +
            '" data-email="' + oj.email + '" data-kinhdo="' + oj.kinhdo + '" data-vido="' + oj.vido +
            '" data-anhnxb="' + oj.anhnxb + '" ><label class="badge badge-success click_sua" ><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</label><label class="badge badge-danger click_xoa"><i class="fa fa-minus-circle" aria-hidden="true">&nbsp; Xóa</label></td >'
            '<tr>'
        
        }
        $(".addListNXB").html(body);
        }
    });
}

