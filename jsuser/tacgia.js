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
            matg: $(".txtmatg").val(),
            tentg: $(".txttentg").val(),
            diachi: $(".txtdiachi").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            anhtg: $(".txtanh").val()

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/tacgia/insert_tg.php", ojdata, function (res) {
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
            matg: $(".txtmatg").val(),
            tentg: $(".txttentg").val(),
            diachi: $(".txtdiachi").val(),
            sdt: $(".txtsdt").val(),
            email: $(".txtemail").val(),
            anhtg: $(".txtanh").val()
     

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/tacgia/update_tg.php", ojdata, function (res) {
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
                    matg: $(".txtmatg").val()
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/tacgia/delete_tg.php", ojdata, function (res) {
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
    $(".addListTG").on('click','.click_sua',function(){
        var matg=$(this).parents().attr("data-matg");
        var tentg = $(this).parents().attr("data-tentg");
        var diachi=$(this).parents().attr("data-diachi");
        var sdt = $(this).parents().attr("data-sdt");
        var email=$(this).parents().attr("data-email");
        //var anhtg = $(this).parents().attr("data-anhtg");
        $(".txtmatg").val(matg);
        $(".txttentg").val(tentg);
        $(".txtdiachi").val(diachi);
        $(".txtsdt").val(sdt);
        $(".txtemail").val(email);
        //$(".txtanh").val(anhtg);

        $(".btnsua").prop("disabled", false);
    })
    $(".btnsua").click(function () {
        $(".btnsua").prop("disabled", true);
        $(".btnluu").prop("disabled", false);
        $(".txttentg").focus();
        flag = 2;// nguoi dung nhan nut sua
    });
    $(".addListTG").on('click','.click_xoa',function(){
        var matg=$(this).parents().attr("data-matg");
        var tentg=$(this).parents().attr("data-tentg");
        
        bootbox.confirm("Bạn có muốn xóa  ["+tentg+"] này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    matg: matg
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/tacgia/delete_tg.php", ojdata, function (res) {
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
    $(".addListTG").on('click', '.click_anh', function () {
        var anh = $(this).attr("data-anhtg");
        console.log(anh);
        $('.showmodal').modal('show');
        $('.addimage').attr("src", "anhtg/" + anh);

    });
    $(".btnclose").click(function () {
        $('.showmodal').modal('hide');
    });
});
function resetView() {
    $(".txtmatg").val("");
    $(".txttentg").val("");
    $(".txtdiachi").val("");
    $(".txtsdt").val("");
    $(".txtemail").val("");
    $(".txtanh").val("");
    $(".txtmatg").focus();
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
    $(".addListTG").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/tacgia/api_getalltg_search.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if(mang.length==0){
            $(".addListTG").html("<tr><td colspan=4> Không tìm thấy dữ liệu </td></tr>")
        }
        else{
        var body = '';
        console.log(mang);
        for(var i in mang){
        var oj = mang[i] ;
        
        body = body +'<tr>' + 
            '<td>'+(parseInt(i)+1)+'</td>' +
            '<td>' + oj.matg + '</td>' +
            '<td data-anhtg = "'+oj.anhtg+'" class="click_anh"><img class="img-xs rounded-circle" src="anhtg/' + oj.anhtg + '" alt="Profile image"></td>' +
            '<td class="text danger"> ' + oj.tentg + ' </td>' +
            '<td class="text danger"> ' + oj.diachi + ' </td>' +
            '<td class="text danger"> ' + oj.email + ' </td>' +
            '<td class="text danger"> ' + oj.sdt + ' </td>' +
            '<td data-matg="' + oj.matg + '" data-tentg="' + oj.tentg + '" data-diachi="' + oj.diachi + '" data-sdt="' + oj.sdt +
            '" data-email="' + oj.email + '" data-anhtg="' + oj.anhtg + '" ><label class="badge badge-success click_sua" ><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</label><label class="badge badge-danger click_xoa"><i class="fa fa-minus-circle" aria-hidden="true">&nbsp; Xóa</label></td >'
            '<tr>'
        
        }
        $(".addListTG").html(body);
        }
    });
}

