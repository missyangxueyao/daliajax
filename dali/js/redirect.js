/**
 * Created by yangxueyao on 2017/12/22.
 */
/**
 * 跳转链接
 * @param url 连接地址
 * @param rep 是否替换本页历史
 * @param target 是否在新窗口打开
 */
function redirect(url, rep, target){
    if (target == true) {
        window.open(url);
    } else if (rep == true) {
        location.replace(url);
    } else {
        window.location.href = url;
    }
}
