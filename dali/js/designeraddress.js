/**
 * Created by yangxueyao on 2017/12/25.
 */
/**
 * Created by yangxueyao on 2017/12/25.
 */

//省
var provinceDictionary = [];
//市
var cityDictionary = [];
//区
var areaDictionary = [];
//省
var alertProvince = "请选择省";
//市
var alertCity = "请选择市";
//区
var alertArea = "请选择区";

/**
 * 初始化
 *
 * */
//window.onload = function() {
setup();
//};

function setup() {

    $('.designer-province').append('<option>' + alertProvince + '</option>');
    $('.designer-city').append('<option>' + alertCity + '</option>');
    $('.designer-area').append('<option>' + alertArea + '</option>');

    //省
    restdesignerProvince();
}

//点击省
$('.designer-province').change(function(){

    //市
    restdesignerCity();

    //区
    restdesignerArea();
});

//点击市
$('.designer-city').change(function(){

    //区
    restdesignerArea();
});

/**
 * 重置省
 * */
function restdesignerProvince() {
    provinceDictionary = getNextLevelDictionary(true);

    var array = Object.values(provinceDictionary);
    for(var i = 0;i < array.length;i++) {
        var option = '<option>' + array[i] + '</option>';
        $('.designer-province').append(option);
    }
}
/**
 * 重置市
 * */
function restdesignerCity() {
    $('.designer-city').html('');
    $('.designer-city').append('<option>' + alertCity + '</option>');
    var provinceValue = $('.designer-province option:selected').text();
    cityDictionary = getNextLevelDictionary(false,getKeyOfValue(provinceDictionary,provinceValue));
    var cityArray = Object.values(cityDictionary);
    for(var i = 0;i < cityArray.length;i++) {
        var cityOption = '<option value="">' + cityArray[i] + '</option>';
        $('.designer-city').append(cityOption);
    }
}
/**
 * 重置区
 * */
function restdesignerArea() {
    $('.designer-area').html('');
    $('.designer-area').append('<option value="">' + alertArea + '</option>');
    var cityValue = $('.designer-city option:selected').text();
    areaDictionary = getNextLevelDictionary(false,getKeyOfValue(cityDictionary,cityValue));
    var areaArray = Object.values(areaDictionary);
    for(var i = 0;i < areaArray.length;i++) {
        var areaOption = '<option value="">' + areaArray[i] + '</option>';
        $('.designer-area').append(areaOption);
    }

}
/**
 * 获取字典中value对应的key
 *
 * @pragma dictionary 字典
 * @pragma value 值
 *
 * @return key
 * */
function getKeyOfValue(dictionary,value) {
    var trueKey = "";
    for (var key in dictionary) {
        if (dictionary[key] == value) {
            trueKey = key;
            break;
        }
    }
    return trueKey;
}

/**
 * 获取下一级
 *
 * @pragma isProvince 是否获取省
 * @pragma prarentID 上一级id
 * */
function  getNextLevelDictionary(isProvince,prarentID) {
    if (isProvince == true) {
        return ChineseDistricts["86"];
    } else {
        var dict = ChineseDistricts[prarentID];
        if (dict == undefined) return [];
        return dict;
    }
}


