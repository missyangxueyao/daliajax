var daLei = {};
var param;

new function () {
    param = get_param();
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
        '            <em>尺码：</em><input type="text" class="size"/>' +
        '            <em>颜色：</em><input type="text" class="color"/>' +
        '            <em>价格：</em><input type="text" class="price"/>' +
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
    var html = '<span class="spanactive"> '+text+' <input type="hidden" class="min" value="'+min_price+'" /> <input type="hidden" class="max" value="'+max_price+'" /> <input type="text" class="price" placeholder="请输入价格"> <i onclick="deleteThis(this);"></i></span>';
    $("#addSpan").before(html);
    $("#jtPrice input").val("");
}

function fileUploadImage(obj, id) {
    $.ajaxFileUpload({
        url: API_SERVICE_URL + "app_pic/upload.do",
        dataType: "json",
        type: "post",
        secureuri: false,
        async: false,
        fileElementId: id,
        data: {DIR:"goods", Cut: 0, APPUSER_ID:sessionStorage.APPUSER_ID},
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            data = JSON.parse(data.responseText);
            $("#" + id).siblings().attr("src", "/" + data.data);
        }
    });
}

function deleteThis(obj) {
    obj = $(obj);
    obj.parent().remove();
}

function submitGoods() {
    var toJson = GET_LADDER_ARRAY();
    var data = {
        "ACC_PRICE": $("#ACC_PRICE").val() ? ($("#ACC_PRICE").val() + $("#ACC_PRICE_").val()) : "",
        "APPUSER_ID": sessionStorage.APPUSER_ID,
        "ARTICLE_NO": $("#ARTICLE_NO").val(),
        "DAY": $("#huoqi").val(),
        "FACE_PRICE": $("#FACE_PRICE").val() ? ($("#FACE_PRICE").val() + $("#FACE_PRICE_").val()) : "",
        "FORMS": $("#FORMS").val(),
        "GENGER": $("#GENGER").val(),
        "GOODS_NAME": $("#GOODS_NAME").val(),
        "INTRO": $("#INTRO").val(),
        "IS_REBATE": GET_IS_REBATE(),
        "REBATE": GET_IS_REBATE ? $("#REBATE").val() : 0,
        "LADDER_JSON": toJson ? JSON.stringify(toJson) : "",
        "MEET_ID": param.MEET_ID,
        "MIN_QUINTITY": $("#MIN_QUINTITY").val(),
        "OTH_PRICE": $("#OTH_PRICE").val() ? ($("#OTH_PRICE").val() + $("#OTH_PRICE_").val()) : 0,
        "POSITION": $("#kuanshi").val(),
        "PRO_PRICE": $("#PRO_PRICE").val() ? ($("#PRO_PRICE").val() + $("#PRO_PRICE_").val()) : "",
        "PRICE": toJson ? toJson[0].PRICE : "",
        "ROLLPIC": GET_POLL_PIC(),
        "SEASON": GET_SEASON(),
        "SERIES_NAME" : $("#xilie").val(),
        "SIZE_JSON": GET_SIZE_JSON(),
        "STYLE_NO": $("#STYLE_NO").val(),
        "TYPE_NAME": $("#dalei2").val()
    };
    var isEmpty = false;
    $.each(data, function (i, v) {
        if (v === "") {
            isEmpty = true;
        }
    });
    if (isEmpty) {
        show_alert("请把信息填写完整！");
        return;
    }
    myrequest("app_sign/add.do", null, data, true, function (data) {
        location.href = "goodssubmit.html";
    });
}

/**
 * 是否含税
 * @return {number}
 * @constructor
 */
function GET_IS_REBATE() {
    if ($("#IS_REBATE").hasClass("goodsinfomation-radiochecked")) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * @return {string|object}
 * @constructor
 */
function GET_LADDER_ARRAY() {
    var json = [], i = 0;
    var isNull = false;
    $(".addcolor > .spanactive").each(function () {
        var _obj = $(this);
        json[i] = {
            "BEGIN_NUM": _obj.children(".min").val(),
            "END_NUM": _obj.children(".max").val(),
            "PRICE": _obj.children(".price").val(),
        };
        if (json[i].PRICE == "") {
            isNull = true;
        }
        i++;
    });
    if (isNull) {
        return "";
    }
    return json;
}

/**
 * @return {string}
 * @constructor
 */
function GET_POLL_PIC() {
    var str = '', isNull = false;
    $(".imgLabel").each(function () {
        var obj = $(this);
        if (!obj.find("img").attr("src")) {
            isNull = true;
            return ;
        }
        str = str ? (str + ";" + obj.find("img").attr("src")) : obj.find("img").attr("src");
    });
    return isNull ? "" : str;
}

/**
 * @return {*|jQuery}
 * @constructor
 */
function GET_SEASON() {
    return $("#SEASON span.spanactive").html();
}

/**
 * @return {string}
 * @constructor
 */
function GET_SIZE_JSON() {
    var json = [], i = 0, isNull = false;
    $("#guiGe p").each(function () {
        var obj = $(this);
        json[i] = {
            SIZE: obj.find(".size").val(),
            COLOR:  obj.find(".color").val(),
            COLOR_PRICE:  obj.find(".price").val(),
        };
        if (json[i].SIZE === "" || json[i].COLOR === "" || json[i].COLOR_PRICE === "") {
            isNull = true;
        }
        i++;
    });
    return isNull ? "" : JSON.stringify(json);
}