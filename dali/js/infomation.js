/**
 * Created by yangxueyao on 2017/12/29.
 */
var year = 2017;
for(var i=0;i<100;i++){
    year++;
    $('.year').append('<option value="'+year+'">'+year+'年</option>');
}
$('.year').change(function(){
    month();
    days();
});
$('.month').change(function(){
    days();
});
function month() {
    for(var i=1;i<13;i++){
        $('.month').append('<option value="'+i+'">'+i+'月</option>');
    }
}
//    判断是否是闰年
function isLeapYear(year) {
    //四年一润,百年不闰,四百年再润
    var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
    var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
    var cond3 = year % 400 ==0;  //条件3：年份是400的倍数
    var cond = cond1 && cond2 || cond3;
    if(cond) {
        return true;
    } else {
        return false;
    }
}
function days(){
    $('.day').html('');
    if($('.month').val() == "1" || $('.month').val() == "3" || $('.month').val() == "5" || $('.month').val() == "7" || $('.month').val() == "8" || $('.month').val() == "10" || $('.month').val() == "12"){
        for(var i=1;i<=31;i++){
            $('.day').append('<option value="'+i+'">'+i+'日</option>');
        }
    } else if ($('.month').val() == "2"){
        if (isLeapYear($('.year').val())){
            for(var i=1;i<=29;i++){
                $('.day').append('<option value="'+i+'">'+i+'日</option>');
            }
        } else {
            for(var i=1;i<=28;i++){
                $('.day').append('<option value="'+i+'">'+i+'日</option>');
            }
        }
    } else {
        for(var i=1;i<=30;i++){
            $('.day').append('<option value="'+i+'">'+i+'日</option>');
        }
    }
}

$('.infomationtitle p:last').css({'padding-right':'0'});
$('.supplierclassify-radio p').find('em').click(function () {
    $(this).addClass('supplierclassify-radiochecked').parent().siblings().find('em').removeClass('supplierclassify-radiochecked');
});
myrequest("app_type/listAll.do",null,{},true,function(json){
    var result = json.data;
    for(var i=0;i< result.length;i++){
        $('.businesscategory').append('<span data-z = "'+result[i].TYPE_ID+'">'+result[i].TYPE_NAME+'</span>');
    }
    var res = json.data1;
    for (var i=0;i<res.length;i++){
        $('.clothingbrand').append('<span data-id = "'+res[i].SERVER_ID+'">'+res[i].SERVER_NAME+'</span>')
    }
    $('.supplierclassify-info p').find('span').toggle(
        function(){
            $(this).addClass('supplierclassify-infoactive');
        },
        function(){
            $(this).removeClass('supplierclassify-infoactive');
        }
    )
});
//添加数据
function infomation() {
    /**********************工厂部分数据********************************/
    //获取选中的经营品类;
    var typeid = $('.supplierclassify-info .businesscategory').find('.supplierclassify-infoactive');
    var typeidarr = [];
    for (var i=0;i<typeid.size();i++) {
        var objarr = $('.businesscategory span').eq(i).attr('data-z');
        //将选中的经营品类加入数组
        typeidarr.push(objarr);
    }
    console.info(typeidarr);
    //将数组转换为字符串用逗号分割
    var arrStr = typeidarr.join(",");
    var productionsize = $('.productionsize').val();
    // 获取服装品牌
    var clothingbrandid= $('.supplierclassify-info .clothingbrand').find('.supplierclassify-infoactive');
    var clothingbrandaarr = [];
    for (var i=0;i<clothingbrandid.size();i++) {
        var clothone = $('.clothingbrand span').eq(i).attr('data-id');
        clothingbrandaarr.push(clothone);
    }
    var clothingbrand = clothingbrandaarr.join(",");
    //详细地址
    var address = $('.factory .address').val();
    var provinceValue = $('.province option:selected').text()+"-";
    var cityValue = $('.city option:selected').text()+"-";
    var areaValue = $('.area option:selected').text();
    var region = provinceValue + cityValue + areaValue;
    var areaID = getKeyOfValue(areaDictionary,areaValue);
//       ***************************公司信息部分************************************
    var company = $('.companyinfo .companyinfo-contact p');
    var contact = company.eq(0).find('input').val();
    var telphone = company.eq(1).find('input').val();
    var email = company.eq(2).find('input').val();
    var tax_qualification ='';
    if ($('.tax-qualification p').eq(0).find('em').hasClass('supplierclassify-radiochecked')){
        tax_qualification = 0
    } else{
        tax_qualification = 1
    }
    var companyinfo_tax = $('.companyinfo-tax p');
    var taxnumber = companyinfo_tax.eq(0).find('input').val();
    var taxrebate = companyinfo_tax.eq(1).find('input').val();
    var taxcert = companyinfo_tax.eq(2).find('input').val();
    var cert_no = $('.cert-no').find('input').val();
    //营业照到期时间
    var year = $('.year').val()+'-';
    var month = $('.month').val()+"-";
    var day = $('.day').val();
    var time = year+ month+day;
    //工厂照片
    var imgarr = [];
    for (var i=0;i<$(".gongimg img").length;i++){
        var imgsrc = $(".gongimg img").eq(i).attr("src");
        imgarr.push(imgsrc);
    }
    var IN_PIC = imgarr.join(';');
    //营业执照照片
    var cert_pic = $(".cert-pic img").attr("src");
    var myData = {
        "ADDRESS": address,
        "CATEGORY": "0",
        "CERT": taxcert,
        "CERT_NO": cert_no,
        "CERT_PIC": cert_pic,
        "CONTRACT": contact,
        "EMAIL": email,
        "IN_PIC": IN_PIC,
        "LIMIT": time,
        "NUMBER": taxnumber,
        "REBATE": taxrebate,
        "REGION": region,
        "REGION_ID": areaID,
        "SERVER_ID": clothingbrand,
        "SIZE": productionsize,//生产规模
        "TELPHONE": telphone,
        "TYPE": tax_qualification,
        "TYPE_ID": arrStr
    };
    myrequest("app_user/finish.do",{"CATEGORY":"0"},myData,true,function(json){
        window.location.href = 'logoin.html';
    },function(json){
        //window.location.href = 'logoin.html';
    });
}
if (sessionStorage.getItem("VERIFY") == 0 && sessionStorage.getItem("CATEGORY") == 0 || sessionStorage.getItem("VERIFY") == 1 && sessionStorage.getItem("CATEGORY") == 0 || sessionStorage.getItem("VERIFY") ==3 && sessionStorage.getItem("CATEGORY") == 0 ){
    againedit();
}
function againedit() {
    myrequest("app_user/get.do",null,{},true,function(json){
        var result = json.data;
        var obj = $('.businesscategory span');
        var obj1 = $('.clothingbrand span');
        for (var i=0;i<obj.length;i++){
            var text = obj.eq(i).text();
            var ab = false;
            for(var j=0;j<result.typeList.length;j++){
                if (result.typeList[j].TYPE_NAME == text) {
                    ab = true;
                    break;
                }
            }
            if (ab == true){
                obj.eq(i).addClass('supplierclassify-infoactive');
            }
        }
        //服装品牌
        for (var i=0;i<obj1.length;i++){
            var text1 = obj1.eq(i).text();
            var ab1 = false;
            for(var j=0;j<result.serverList.length;j++){
                if (result.serverList[j].SERVER_NAME == text1) {
                    ab1 = true;
                    break;
                }
            }
            if (ab1 == true){
                obj1.eq(i).addClass('supplierclassify-infoactive');
            }
        }
        var plist = $('.companyinfo-contact p');
        $('.productionsize').val(result.SIZE) ;
        // 营业执照期限
        var limit = result.LIMIT.split('-');
        $('.year').val(limit[0]);
        month();
        $('.month').val(limit[1]);
        days();
        $('.day').val(limit[2]);
        var regoin = result.REGION.split('-');
        $('.province').val(regoin[0]);
        restCity();
        $('.city').val(regoin[1]);
        restArea();
        $('.area').val(regoin[2]);
        $('.address').val(result.ADDRESS);
        plist.eq(0).find('input').val(result.CONTRACT);
        plist.eq(1).find('input').val(result.TELPHONE);
        plist.eq(2).find('input').val(result.EMAIL);
        if(result.TYPE == 0){
            $('.tax-qualification p').eq(0).find('em').addClass('supplierclassify-radiochecked')
        } else {
            $('.tax-qualification p').eq(1).find('em').addClass('supplierclassify-radiochecked')
        }
        var taxlist = $('.companyinfo-tax p');
        taxlist.eq(0).find('input').val(result.NUMBER);
        taxlist.eq(1).find('input').val(result.REBATE);
        taxlist.eq(2).find('input').val(result.CERT);
        taxlist.eq(4).find('input').val(result.CERT_NO);
        var IN_PIC = result.IN_PIC.split(';');
        //营业执照
        $('.cert-pic img').attr('src',result.CERT_PIC);
        //工厂
        for(var i=0;i<IN_PIC.length;i++){
            $('.gongimg img').eq(i).attr('src',IN_PIC[i]);
        }
    });
}

