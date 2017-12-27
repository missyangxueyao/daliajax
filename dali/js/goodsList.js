/**
 * 加载数据并分页
 * @param status        审核状态
 * @param page          页码
 * @param page_size     每页大小，0为默认
 * @param getPage       是否分页
 */
function getList(status, page, page_size, getPage) {
    page = page ? page : 0;
    myrequest("app_sign/findPage.do", null, {
        PAGE: page,
        PAGE_SIZE: 0,
        APPUSER_ID: sessionStorage.APPUSER_ID,
        VERIFY: status
    }, true, function (data) {
        if (getPage) {
            $('#demo').jqPaginator({
                totalCounts: data.data1 ? data.data1 : 1,
                pageSize: data.data2 ? data.data2 : 8,
                visiblePages: data.data2 ? data.data2 : 8,
                currentPage: 1,
                onPageChange: function (num, type) {
                    getList(status, --num, 0);
                }
            });
        } else {
            setGoodsHtml(data.data, page_size);
        }
    });
}

/**
 * 循环获取html
 * @param list
 * @param page_size
 */
function setGoodsHtml(list, page_size) {
    if (!page_size) {
        page_size = list.length;
    }
    var html = '';
    for (var i = 0; i < page_size; i++) {
        html += getGoodsHtml(list[i]);
    }
    $(".homepagegoods .homepage-main").html(html);
}

/**
 * 生成一条商品的html
 * @param info
 * @return {string}
 */
function getGoodsHtml(info) {
    var html = '<div class="homepagelist-one">' +
        '    <img src="'+API_SERVICE_IMAGE_URL+info["LOGO"]+'" alt="">' +
        '    <h1>'+info.GOODS_NAME+'</h1>' +
        '    <h2>单价 <span>￥'+info.PRICE+'</span></h2>' +
        '    <p>季节：'+info.SEASON+'&nbsp;&nbsp;&nbsp;&nbsp;品类：'+info.TYPE_NAME+'&nbsp;&nbsp;&nbsp;&nbsp;起订量：'+info.MIN_QUINTITY+'&nbsp;&nbsp;&nbsp;&nbsp;颜色：'+info.COLOR+'&nbsp;&nbsp;&nbsp;&nbsp;尺寸：'+info.SIZE+'&nbsp;&nbsp;&nbsp;&nbsp;面料：'+info.FORMS+'&nbsp;&nbsp;&nbsp;&nbsp;货期：'+info.DAY+'天</p>' +
        '</div>';
    return html;
}