/**
 * Created by yangxueyao on 2017/12/20.
 */
//$.getscript("md5.js");

/* 服务器地址 */
var API_SERVICE_URL = "http://121.199.8.244:8880/ELC/";
/* 图片前缀 */
var API_SERVICE_IMAGE_URL = "http://121.199.8.244:8880/";

/**
 * POST请求
 *
 * @param url 前缀
 * @param headers
 * @param data 参数字典
 * @param isUser 是否是用户操作true/false
 * @param successFunction  成功回调
 * @param successErrorFunction 成功失败回调
 * @param failureFunction 失败回调
 *
 *
 */
function myrequest(url,headers,data,isUser,successFunction,successErrorFunction,failureFunction) {

    var createTime = getSystemTime();
    //从session中获取用户id
    if (isUser == true) {
        data["APPUSER_ID"] = sessionStorage.getItem("APPUSER_ID");

    }
    var sign = md5(createTime + sortOutData(data));

    var myData = {
        "createTime":createTime,
        "data":data,//测试服务器
        //"data":md5(sortOutData(data)),//正式服务器
        "sign":sign
    };

    $.ajax({
        type: "POST",
        url: API_SERVICE_URL + url,
        //headers: headers==null?[]:headers,
        headers:headers,
        data: JSON.stringify(myData),
        contentType: "application/json",
        dataType: "JSON",
        async: true,
        beforeSend : function(){
            //拼接所有的地址
            //console.log("打印地址:" + JSON.stringify(myData))
        },
        success : function(json){
            if (json.response != 0) {
                alert(json.desc);
                //失败
                if (successErrorFunction == null) { return false; }
                successErrorFunction(json);
            } else {
                //成功
                if (successFunction == null) { return false; }
                successFunction(json);
            }
        },
        error : function(XMLHttpRequest){
            //失败
            //alert(XMLHttpRequest.desc);
            if (failureFunction == null) { return false; }
            failureFunction(XMLHttpRequest);
        }
    });

}
/**
 * 将字典转换为字符串
 *
 * @param data 字典
 * @return 字符串
 * */
function sortOutData(data) {
    var keyValueString = '{';
    for (var key in data) {
        keyValueString += '"';
        keyValueString += 'key';
        keyValueString += '"';
        keyValueString += ':';
        keyValueString += '"';
        keyValueString += data[key];
        keyValueString += '"';
        keyValueString += ',';
    }
    //获取字符串最后一位
    var lastChar = keyValueString.charAt(keyValueString.length-1);

    if (lastChar == ',') {
        keyValueString = keyValueString.substring(0,keyValueString.length-1);
    }
    keyValueString += '}';
    if (keyValueString == '{}') {
        keyValueString = "";
    }
    return keyValueString;
}
/**
 * 获取系统当前时间
 * */
function getSystemTime(){
    var str = '';
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var seconds = myDate.getSeconds();

    if(month<10){
        month = '0'+month;
    }
    if(day<10){
        day = '0'+day;
    }
    str = year +'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
    return str;
}