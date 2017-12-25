/**
 * Created by yangxueyao on 2017/12/25.
 */
$('.addimg').click(function(){
    $('input[type="file"]').click();
    $("#file").unbind('change').bind('change',function(){
//                alert("111");
        $('input[type="file"]').click();
        var form = new FormData();
        var file = $("#file")[0].files[0];//获取type="file"类型的input
        form.append("file",file);
//                $.ajax({
//                    url:"http://weixin.ivy-china.com/staff/upPic",
//                    data:form,
//                    contentType:false,
//                    processData:false,
//                    type:"post",
//                    dataType:"json",
//                    success:function(e){
//                        if (e.code==200){
//                            console.info(file);
//
//                            var result = e.data;
//                            $(".gongimg").append('<img src="'+result.apath+'"/>')
//
//                        }
//                    }
//                })
    })
})