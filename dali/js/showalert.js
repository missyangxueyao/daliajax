/**
 * Created by yangxueyao on 2017/12/21.
 */
/**
 *
 * @param msg 提示信息
 * @param renovate 是否刷新
 * @param local_url 跳转地址
 * @param rep
 * @param result
 */
function show_alert(msg, renovate, local_url, rep, result){
    if (result != "success" && result != "error") {
        result = "";
    } else {
        result = "alert_" + result;
    }
    var html = '<div class="alert_dialog"><div class="show_alert '+result+'">'+msg+'</div></div>';
    $("body").append(html);
    var i = 0;
    var setI = setTimeout(function(){
        $('.alert_dialog').remove();
        if(renovate == true){
            history.go(0);
        }
        if(local_url != "" && local_url != undefined){
            redirect(local_url, rep);
        }
        if(i >= 1){
            clearTimeout(setI);
        }
        i++;
    }, 2000);
}


/**
 * 获取url参数
 * @returns {Array}
 */
function get_param(url){
    if (url != '' && url != undefined && url != null){
        var local_url = url;
    } else {
        var local_url = document.location.href;
    }
    var data = local_url.split("?");
    data = data[1];
    var get_data = [];
    if(data != '' && data != undefined){
        data = data.split("&");
        $.each(data, function(i, v){
            var j = v.split("=");
            get_data[j[0]] = decodeURI(j[1]);
        });
    }
    return get_data;
}

/**
 * 时间戳转换
 * @param time 到秒的时间戳,如果穿传空,则为当前时间
 * @param his 是否到时分秒
 * @returns {string}
 */
function get_date(time, his){
    if(time != "") {
        time = new Date(time);
    } else {
        time = new Date();
    }
    var year = time.getFullYear();
    var month = parseInt(time.getMonth()) + 1;
    var day = time.getDate();
    month = (month>=10)?month:"0"+month;
    day = (day>=10)?day:"0"+day;
    if(his){
        var hours = time.getHours();
        hours = (hours>=10)?hours:"0"+hours;
        var min = time.getMinutes();
        min = (min>=10)?min:"0"+min;
        var sen = time.getSeconds();
        sen = (sen>=10)?sen:"0"+sen;
        return year+'-'+month+'-'+day+' '+hours+':'+min+':'+sen;
    }else{
        return year+'-'+month+'-'+day;
    }
}