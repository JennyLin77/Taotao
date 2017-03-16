$(document).ready(function () {
    var carouselObj = new carousel();

    $("#a-login").click(function () {
        $("#login-div").show();
        $("body").addClass('noScroll');

        $('#input-name').focus();
        $('#input-name').val("");
        $('#input-password').val("");
        $('#name-tip').hide();
        $('#password-tip').hide();

        carouselObj.stop();
    })

    $('#close-btn').click(function () {
        $('#login-div').hide();
        $("body").removeClass('noScroll');

        carouselObj.start();
    })
});

$('#pic li').click(function () {
    if($('#header-info').length == 0){
        alert("亲，如果想查看商品详情，请先登录哦~");
    }else{
        var goodId = $(this).attr('dataId');
        window.location.href = '/goodDetail?goodId=' + goodId;
    }
});

$('.good-list').on('click', '.good-item img', function () {
    if($('#header-info').length == 0){
        alert("亲，如果想查看商品详情，请先登录哦~");
    }else{
        var goodId = $(this).parent().attr('dataId');
        window.location.href = '/goodDetail?goodId=' + goodId;
    }
});

$('.good-list').on('click', 'h3', function () {
    if($('#header-info').length == 0){
        alert("亲，如果想查看商品详情，请先登录哦~");
    }else{
        var goodId = $(this).parent().parent().attr('dataId');
        window.location.href = '/goodDetail?goodId=' + goodId;
    }
});

$('.search-div').click(function () {
    var searchVal = $('#search-input').val();
    searchVal = searchVal.replace(/(^\s*)|(\s*$)/g, "");

    window.location.href = '/allGood/doSearch?searchVal=' + searchVal;
});
