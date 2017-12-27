var daLei = {};

new function () {
    var param = get_param();
    if (!param.MEET_ID) {
        history.back();
        return;
    }
    $('.goodsinfomation p.jiJie span').click(function () {
        $(this).addClass('spanactive').siblings().removeClass("spanactive");
    });
    $('.goodsinfomation p strong').click(function () {
        $(this).addClass('goodsinfomation-radiochecked').siblings().removeClass('goodsinfomation-radiochecked')
    });

    myrequest('app_type/findAll.do', null, {
        APPUSER_ID: sessionStorage.APPUSER_ID
    }, true, function (json) {
        //系列
        var xilie = '';
        $.each(json.data1, function (i, v) {
            xilie += '<option value="' + v.SERIES_NAME + '">' + v.SERIES_NAME + '</option>';
        });
        $("#xilie").html(xilie);
        //货期
        var huoqi = '';
        $.each(json.data2, function (i, v) {
            huoqi += '<option value="' + v.DAY + '">'+v.DAY+'</option>';
        });
        $("#huoqi").html(huoqi);
        //款式定位
        var kuanshi = '';
        $.each(json.data3, function (i, v) {
            kuanshi += '<option value="'+v.POSITION+'">'+v.POSITION+'</option>';
        });
        $("#kuanshi").html(kuanshi);
        //大类
        daLei = json.data;
        var daLei1Html = '';
        var daLei2Html = ''
        $.each(daLei, function (i, v) {
            daLei1Html += '<option value="'+i+'">'+v.TYPE_NAME+'</option>';
            if (i === 0 && v.type_detailList.length > 0) {
                $.each(v.type_detailList, function (k, val) {
                    if (val.DETAIL_NAME) {
                        daLei2Html += '<option value="' + v.TYPE_NAME + ',' + val.DETAIL_NAME + '">'+val.DETAIL_NAME+'</option>'
                    } else {
                        daLei2Html += '<option value="' + v.TYPE_NAME + '"></option>'
                    }
                });
                $("#dalei2").html(daLei2Html);
            } else if (i === 0) {
                daLei2Html = '<option value="' + v.TYPE_NAME + '"></option>'
                $("#dalei2").html(daLei2Html);
            }
            $("#dalei1").html(daLei1Html);
        });
    })
};

function addGuiGe() {
    var html = '<p>' +
        '            <em>尺码：</em><input type="text"/>' +
        '            <em>颜色：</em><input type="text"/>' +
        '            <em>价格：</em><input type="text"/>' +
        '            <i onclick="addGuiGe()"></i><i class="del" onclick="deleteGuiGe(this);"></i>' +
        '        </p>';
    $("#guiGe").append(html);
}

function deleteGuiGe(obj) {
    obj = $(obj);
    if ($("#guiGe p").length <= 1) {
        show_alert("请至少保留一个");
        return;
    }
    obj.parent().remove();
}

function selectDaLei(key) {
    var data = daLei[key].type_detailList;
    var daLei2Html = '';
    if (data.length > 0) {
        $.each(data, function (k, val) {
            if (val.DETAIL_NAME) {
                daLei2Html += '<option value="' + daLei[key].TYPE_NAME + ',' + val.DETAIL_NAME + '">'+val.DETAIL_NAME+'</option>'
            } else {
                daLei2Html += '<option value="' + daLei[key].TYPE_NAME + '"></option>'
            }
        });
        $("#dalei2").html(daLei2Html);
    } else {
        daLei2Html = '<option value="' + daLei[key].TYPE_NAME + '"></option>'
        $("#dalei2").html(daLei2Html);
    }
}

function showAddPriceJt() {
    $("#jtPrice").show();
}

function surePrice() {
    var min_price = $("#minPrice").val();
    var max_price = $("#maxPrice").val();
    if (!min_price) {
        show_alert("请输入最小价格");
        return;
    }
    max_price = max_price ? max_price : -1;
    var text = '';
    if (max_price !== -1) {
        text = min_price + " ~ " + max_price;
    } else {
        text = min_price + "件以上";
    }
    var html = '<span class="spanactive"> '+text+' <input type="hidden" class="min" value="'+min_price+'" /> <input type="hidden" class="max" value="'+max_price+'" /> <input type="text" class="price" placeholder="请输入价格"> <i></i></span>';
    $("#addSpan").before(html);
    $("#jtPrice input").val("");
}

function uploadImage(obj, id) {
    $.ajaxFileUpload({
        // url: API_SERVICE_URL + "app_pic/upload.do",
        url: "http://121.199.8.244:3210/api/upload",
        dataType: "json",
        type: "post",
        secureuri: false,
        async: false,
        fileElementId: id,
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
}