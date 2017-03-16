$('.good-list').on('click', '.good-item img', function () {
    var liObj = $(this).parent();
    var isEnter = liObj.attr('isEnter');
    if(isEnter == '0'){
        alert('亲，该商品更新后还未审批或者审批不通过');
    }else if(isEnter == '1'){
        alert('亲，该商品的发布者已被屏蔽');
    }else{
        var goodId = liObj.attr('dataId');
        window.location.href = '/goodDetail?goodId=' + goodId;
    }
});

$('.good-list').on('click', 'h6', function () {
    var liObj = $(this).parent().parent();
    var isEnter = liObj.attr('isEnter');
    if(isEnter == '0'){
        alert('亲，该商品更新后还未审批或者审批不通过');
    }else if(isEnter == '1'){
        alert('亲，该商品的发布者已被屏蔽');
    }else{
        var goodId = liObj.attr('dataId');
        window.location.href = '/goodDetail?goodId=' + goodId;
    }
});