$(document).ready(function () {
    loadChude();
    loadKho();
    loadNXB();
    var flag =0;// chua thao tac
    var s=$(".txtsearch").val();
    loadData(s, 0, record);

    khoitao();
    console.log("ok");
$(".pagenumber").on('click', 'button', function () {
        console.log("page:"+$(this).val());
        loadData(s, $(this).val(), record);
        });
    $(".btnlamlai").click(function () {
        console.log("Click lam lai ok")
        // $(".txtmasach").val("");
        // $(".txttensach").val("");
        // $(".txtmasach").focus();
        resetView();
        khoitao();
    })

    $(".btnthem").click(function () {
        $(".btnthem").prop("disabled", true);
        $(".btnluu").prop("disabled", false);
        // $(".txtmasach").val("");
        // $(".txttensach").val("");
        // $(".txtmasach").focus();
        resetView();
        flag=1;// nguoi dung nhan nut them
    });

    $(".btnluu").click(function () {
        if(flag==1){
        $(".btnthem").prop("disabled", true);//sáng
        $(".btnluu").prop("disabled", true);
        //Chuẩn bị dữ liệu để gửi lên server
        var ojdata = {
            masach: $(".txtmasach").val(),
            tensach: $(".txttensach").val(),
            makho: $(".cbkho").val(),
            macd: $(".cbchude").val(),
            manxb: $(".cbnxb").val(),
            sotrang: $(".txtsotrang").val(),
            ngayXB: $(".cbngayxb").val(),
            giabia: $(".txtgiabia").val(),
            urlfile: $(".txturl").val(),
            anhbia: $(".txtanh").val()

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/sach/insert_sach.php", ojdata, function (res) {
            console.log(res);
            if (res.success == 1) {
                // alert("Insert Thành công");
                bootbox.alert("Insert Thành công!");
                loadData(s, 0, record);
            } else {
                //alert("Insert không Thành công");
                bootbox.alert("Insert không Thành công!");
            }
        });
    }else if(flag==2){
        $(".btnthem").prop("disabled", true);//sáng
        $(".btnluu").prop("disabled", true);
        var ojdata = {
            masach: $(".txtmasach").val(),
            tensach: $(".txttensach").val(),
            makho: $(".cbkho").val(),
            macd: $(".cbchude").val(),
            manxb: $(".cbnxb").val(),
            sotrang: $(".txtsotrang").val(),
            ngayXB: $(".cbngayxb").val(),
            giabia: $(".txtgiabia").val(),
            urlfile: $(".txturl").val(),
            anhbia: $(".txtanh").val()

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/sach/update_sach.php", ojdata, function (res) {
            console.log(res);
            if (res.success == 1) {
                bootbox.alert("Update Thành công!");
                loadData(s, 0, record);
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
                    masach: $(".txtmasach").val()
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/sach/delete_sach.php", ojdata, function (res) {
                    console.log(res);
                    if (res.success == 1) {
                        bootbox.alert("Xóa Thành công");
                        loadData(s, 0, record);
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
        loadData(s, 0, record);
    })
    $(".txtsearch").keyup(function(){
        var s=$(".txtsearch").val();
        console.log(s);
        loadData(s, 0, record);
    });
    $(".addListSach").on('click','.click_sua',function(){
        var masach=$(this).parents().attr("data-masach");
        var tensach = $(this).parents().attr("data-tensach");
        var makho=$(this).parents().attr("data-makho");
        var macd = $(this).parents().attr("data-macd");
        var manxb=$(this).parents().attr("data-manxb");
        var sotrang = $(this).parents().attr("data-sotrang");

        var giabia = $(this).parents().attr("data-giabia");
        var urlfile=$(this).parents().attr("data-urlfile");

        $(".txtmasach").val(masach);
        $(".txttensach").val(tensach);
        $(".txtmakho").val(makho);
        $(".txtmacd").val(macd);
        $(".txtmanxb").val(manxb);
        $(".txtsotrang").val(sotrang);

        $(".txtgiabia").val(giabia);
        $(".txturl").val(urlfile);

        $(".btnsua").prop("disabled", false);
    })
    $(".btnsua").click(function () {
        $(".btnsua").prop("disabled", true);
        $(".btnluu").prop("disabled", false);
        $(".txttensach").focus();
        flag = 2;
    });
    $(".addListSach").on('click','.click_xoa',function(){
        var masach=$(this).parents().attr("data-masach");
        var tensach=$(this).parents().attr("data-tensach");
        
        bootbox.confirm("Bạn có muốn xóa sách  ["+tensach+"] này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    masach: masach
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/sach/delete_sach.php", ojdata, function (res) {
                    console.log(res);
                    if (res.success == 1) {
                        bootbox.alert("Xóa Thành công");
                        loadData(s, 0, record);
                    } else {
                        bootbox.alert("Xóa không Thành công");
                    }
                });
            }
        });
    })
    $(".addListSach").on('click', '.click_anh', function () {
        var anh = $(this).attr("data-anhbia");
        console.log(anh);
        $('.showmodal').modal('show');
        $('.addimage').attr("src", "file-book/" + anh);

    });
    $(".btnclose").click(function () {
        $('.showmodal').modal('hide');
    });
    /*$(".showmodal").on('click','.addimage',function(){
        console.log("ok");
        var w=$(this).attr("width");
        var h=$(this).attr("height");
        console.log(w);
        $(".addimage").attr("width",w-20);
        $(".addimage").attr("height",(h-20));
     //   $(".addimage").attr("src","filebook/"+anh);
    });*/
});
function resetView() {
    $(".txtmasach").val("");
    $(".txttensach").val("");
    $(".txtmakho").val("");
    $(".txtmacd").val("");
    $(".txtmanxb").val("");
    $(".txtsotrang").val("");
    $(".txtgiabia").val("");
    $(".txtngayXB").val("");
    $(".txturl").val("");

    $(".txtmasach").focus();
}
function khoitao() {
    $(".btnthem").prop("disabled", false);//sang
    $(".btnsua").prop("disabled", true);
    $(".btnluu").prop("disabled", true);
}
function loadData(s, page, record) {
    var ojdata = {
        search: s,
        page: page,
        record :record
    }
    $(".addListSach").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/sach/api_getallsach_search_page.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if(mang.length==0){
            $(".addListSach").html("<tr><td colspan=4> Không tìm thấy dữ liệu </td></tr>")
        }
        else{
        var body = '';
        console.log(mang);
        for(var i in mang){
        var oj = mang[i] ;
        
        body = body +'<tr>' + 
            '<td>'+(parseInt(i)+1)+'</td>' +
            '<td>' + oj.masach + '</td>' +
            '<td data-anhbia = "'+oj.anhbia+'" class="click_anh"><img class="img-xs rounded-circle" src="file-book/' + oj.anhbia + '" alt="Profile image"></td>' +
            '<td class="text danger"> ' + oj.tensach + ' </td>' +
            '<td class="text danger"> ' + oj.tenkho + ' </td>' +
            '<td class="text danger"> ' + oj.tencd + ' </td>' +
            '<td class="text danger"> ' + oj.tennxb + ' </td>' +
            '<td class="text danger"> ' + oj.sotrang + ' </td>' +
            '<td class="text danger"> ' + oj.ngayXB + ' </td>' +
            '<td class="text danger"> ' + oj.giabia + ' </td>' +
            '<td class="text danger"> ' + oj.urlfile + ' </td>' +

            '<td data-masach="' + oj.masach + '" data-tensach="' + oj.tensach + '" data-tenkho="' + oj.tenkho + '" data-tencd="' + oj.tencd +
            '" data-tennxb="' + oj.tennxb + '" data-sotrang="' + oj.sotrang + '" data-ngayXB="' + oj.ngayXB + '" data-giabia="' + oj.giabia +
            '" data-urlfile="'+oj.urlfile+'" data-anhbia="'+oj.anhbia+'"><label class="badge badge-success click_sua"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Sửa</label><label class="badge badge-danger click_xoa"><i class="fa fa-minus-circle" aria-hidden="true">&nbsp; Xóa</label></td>'
            '<tr>'
        
            }
            $(".addListSach").html(body);
            buildSlidePage($(".pagenumber"), 5, res.page, res.totalpage);
        }
    });
}

function loadChude() {
    var ojdata = {

    }
    $(".cbchude").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/chude/api_getalltopic.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if (mang.length == 0) {
            $(".cbchude").html("<option value = 'none' >chưa có dữ liệu</option>");
        }else {
            var body = '';
            console.log(mang);
            for (var i in mang) {
                var oj = mang[i];
                body = body + '<option value ="'+oj.macd+'">'+oj.tencd+'</option>';
            }
            $(".cbchude").html(body);
        }
        $(".cbchude").val($(".cbchude option:first").val());
    });
}

function loadKho() {
    var ojdata = {

    }
    $(".cbkho").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/kho/api_getallkho.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if (mang.length == 0) {
            $(".cbkho").html("<option value = 'none' >chưa có dữ liệu</option>");
        }else {
            var body = '';
            console.log(mang);
            for (var i in mang) {
                var oj = mang[i];
                body = body + '<option value ="'+oj.makho+'">'+oj.tenkho+'</option>';
            }
            $(".cbkho").html(body);
        }
        $(".cbkho").val($(".cbkho option:first").val());
    });
}

function loadNXB() {
    var ojdata = {

    }
    $(".cbnxb").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/nhaxb/api_getallnxb.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if (mang.length == 0) {
            $(".cbnxb").html("<option value = 'none' >chưa có dữ liệu</option>");
        }else {
            var body = '';
            console.log(mang);
            for (var i in mang) {
                var oj = mang[i];
                body = body + '<option value ="'+oj.maNXB+'">'+oj.tenNXB+'</option>';
            }
            $(".cbnxb").html(body);
        }
        $(".cbnxb").val($(".cbnxb option:first").val());
    });
}