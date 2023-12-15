$(document).ready(function () {
    var flag =0;// chua thao tac
    var s=$(".txtsearch").val();
    loadData(s);

    khoitao();
    console.log("ok")
    $(".btnlamlai").click(function () {
        console.log("Click lam lai ok")
        // $(".txtmakho").val("");
        // $(".txttenkho").val("");
        // $(".txtmakho").focus();
        resetView();
        khoitao();
    })

    $(".btnthem").click(function () {
        $(".btnthem").prop("disabled", true);
        $(".btnluu").prop("disabled", false);
        // $(".txtmakho").val("");
        // $(".txttenkho").val("");
        // $(".txtmakho").focus();
        resetView();
        flag=1;// nguoi dung nhan nut them
    });

    $(".btnluu").click(function () {
        if(flag==1){
        $(".btnthem").prop("disabled", true);//sáng
        $(".btnluu").prop("disabled", true);
        //Chuẩn bị dữ liệu để gửi lên server
        var ojdata = {
            makho: $(".txtmakho").val(),
            tenkho: $(".txttenkho").val()

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/kho/insert_kho.php", ojdata, function (res) {
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
            makho: $(".txtmakho").val(),
            tenkho: $(".txttenkho").val()

        }
        console.log(ojdata);
        //ajax
        queryData("back_end/kho/update_kho.php", ojdata, function (res) {
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
                    makho: $(".txtmakho").val()
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/kho/delete_kho.php", ojdata, function (res) {
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
    $(".addListKho").on('click','.click_sua',function(){
        var makho=$(this).parents().attr("data-makho");
        var tenkho=$(this).parents().attr("data-tenkho");
        $(".txtmakho").val(makho);
        $(".txttenkho").val(tenkho);
        $(".btnsua").prop("disabled", false);
    })
    $(".btnsua").click(function () {
        $(".btnsua").prop("disabled", true);
        $(".btnluu").prop("disabled", false);
        $(".txttenkho").focus();
        flag = 2;// nguoi dung nhan nut sua
    });
    $(".addListKho").on('click','.click_xoa',function(){
        var makho=$(this).parents().attr("data-makho");
        var tenkho=$(this).parents().attr("data-tenkho");
        
        bootbox.confirm("Bạn có muốn xóa chủ đề ["+tenkho+"] này không", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var ojdata = {
                    makho: makho
                }
                console.log(ojdata);
                //ajax
                queryData("back_end/kho/delete_kho.php", ojdata, function (res) {
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
    $(".txtmakho").val("");
    $(".txttenkho").val("");
    $(".txtmakho").focus();
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
    $(".addListKho").html("<img src='images/loading.gif', width='20px',height='20px'/>loading data... ");
    queryData("back_end/kho/api_getallkho_search.php", ojdata, function (res) {
        console.log(res);
        var mang = res.items;
        if(mang.length==0){
            $(".addListKho").html("<tr><td colspan=4> Không tìm thấy dữ liệu </td></tr>")
        }
        else{
        var body = '';
        console.log(mang);
        for(var i in mang){
        var oj = mang[i] ;
        
        body = body +'<tr>' + 
            '<td>'+(parseInt(i)+1)+'</td>' +
            '<td>'+oj.makho+'</td>' +
            '<td class="text danger"> '+oj.tenkho+' </td>' +
            '<td data-makho="'+oj.makho+'" data-tenkho="'+oj.tenkho+'"><label class="badge badge-success click_sua"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Sửa</label><label class="badge badge-danger click_xoa"><i class="fa fa-minus-circle" aria-hidden="true">&nbsp; Xóa</label></td>'
'<tr>'
        
    }
    $(".addListKho").html(body);
}
});

}