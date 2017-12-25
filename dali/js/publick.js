/**
 * Created by yangxueyao on 2017/12/20.
 */
//function login(phone,password){
//    var createTime = getSysTime();
//    var sign = '';
//    var myStr = createTime+'{"CATEGORY":"2","PASSWORD":"'+password+'","PHONE":"'+phone+'"}';
//    sign = md5(myStr);
//
//    var myData = {
//        "createTime":createTime,
//        "data":{
//            "CATEGORY":'2',//0:用户 1；医生 2:顾问
//            "PASSWORD":password,
//            "PHONE":phone
//        },
//        "sign":sign
//    };
//
//    var myUrl = rootUrl+"app_user/login.do";
//    $.ajax({
//        url: myUrl,
//        type: 'post',
//        dataType: 'JSON',
//        contentType: "application/json",
//        data: JSON.stringify(myData),
//        timeout:0,
//        cache: false,
//        //async: false,//同步请求，默认情况下是异步（true）
//        beforeSend: function(){
//            loadMsg('load','正在登陆...');
//        },
//        success: function (data) {
//            if(data.response=="0"){
//                loadMsg('success','登录成功');
//                localStorage.setItem("APPUSER_ID", data.data.APPUSER_ID);
//                setMySessionData(data.data);
//                window.location.href = 'graphicConsult.html';//consultation
//            }else{
//                loadMsg('alert',data.desc);
//            }
//
//        },
//        complete: function() {
//
//        },
//        error : function(XMLHttpRequest, textStatus, errorThrown) {
//            loadMsg('alert','请检查网络!');
//        }
//    });
//}
//
function getSysTime(){
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

var allurl = 'http://121.199.8.244:8880/ELC';