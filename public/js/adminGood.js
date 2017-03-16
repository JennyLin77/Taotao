$('.container').on('click', '.img-list li img', function () {
    var src = $(this).attr('src');
    $(this).parent().parent().siblings('.picDisplay-block').find('img').attr('src', src);
});

$('.good-list').on('click', 'footer button', function () {
    var isPass = true;
    if($(this).text() == '审批不通过'){
        isPass = false;
    }
    var goodId = $(this).parent().parent().attr('dataId');
    var data = {
        isPass: isPass,
        goodId: goodId
    };
    console.log(data);

    $.ajax({
        data: data,
        dataType: "json",
        type: "POST",
        url: "/user/adminGood/doApprove"
    })
    .done(function (results) {
        console.log(results);
        if(results.success == true){
            var itemObj = $('#item-' + results.goodId);
            itemObj.remove();

            var num = $('.good-item').length;
            console.log(num);
            if(num == 0){
                $('.bottom-tip').parent().remove();
                var isSearch = $('.container').attr('isSearch');
                var rowObj = $('<div class="row warn-tip"></div>');
                if(isSearch == 'true'){
                    rowObj.html('<span>暂无其它商品！！！</span>');
                }else{
                    rowObj.html('<span>暂时没有需要审批的商品！！！</span>');
                }
                $('.container').append(rowObj);
            }
        }else {
            alert('审批失败');
        }
    })
    .fail(function (results) {
        console.log(results);
        alert('审批失败');
    });
});

$('.search-div').click(function () {
    var searchVal = $('#search-input').val();
    searchVal = searchVal.replace(/(^\s*)|(\s*$)/g, "");

    window.location.href = '/user/adminGood/doSearch?searchVal=' + searchVal;
});