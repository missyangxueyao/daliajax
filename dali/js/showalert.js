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
    }, 1000);
}
