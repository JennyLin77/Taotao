$(document).ready(function () {
    $('#tradeMode').val($('#tradeMode').attr('data'));
    $('#degree').val($('#degree').attr('data'));
    $('#paymentWay').val($('#paymentWay').attr('data'));
    $('#tradeTime').val($('#tradeTime').attr('data'));
    $('#tradeStatus').val($('#tradeStatus').attr('data'));
});


var passArr = [true, true, true, true];  //分别对应商品名、价格、商品描述、商品图片

$('#goodName').blur(function () {
    var val = $(this).val();
    var goodNameTip = $('#goodName-tip');
    if(val == "") {
        goodNameTip.text("商品名不能为空");
        goodNameTip.show();
        passArr[0] = false;
    }else {
        goodNameTip.text("");
        goodNameTip.hide();
        passArr[0] = true;
    }
    checkAllInput();
});

$('#price').blur(function () {
    var val = $(this).val();
    var priceTip = $('#price-tip');
    var reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^[0]{1}(\.\d{1,2})?$)/;
    if(val == "") {
        priceTip.text("价格不能为空");
        priceTip.show();
        passArr[1] = false;
    }else if(!reg.test(val)) {
        priceTip.text("价格必须为合法数字，最多两位小数");
        priceTip.show();
        passArr[1] = false;
    }else {
        priceTip.text("");
        priceTip.hide();
        passArr[1] = true;
    }
    checkAllInput();
});

$('#price').focus(function () {
    var priceTip = $('#price-tip');
    priceTip.text("价格必须为合法数字，最多两位小数");
    priceTip.show();
});

$('#detail').focus(function () {
    var detailTip = $('#detail-tip');
    detailTip.html("还可以输入<span>200</span>字");
    caculate();
    detailTip.addClass("normal-tip");
    detailTip.show();
});

$("#detail").keyup(function(){
    caculate();
});

function caculate() {
    var maxLen = 200;  //最大字符个数
    var val = $("#detail").val();
    var len = val.length;  //当前已用字符数
    if (len > maxLen) {
        $("#detail").val(val.substring(0, maxLen));   //超出时截取掉字符
        len = maxLen;
    }
    var remlen = maxLen - len;
    $('#detail-tip span').html(remlen);
}


$('#detail').blur(function () {
    var val = $(this).val();
    var detailTip = $('#detail-tip');
    if(val == "") {
        detailTip.html("商品描述不能为空");
        detailTip.removeClass('normal-tip');
        detailTip.show();
        passArr[2] = false;
    }else {
        detailTip.html("");
        detailTip.hide();
        passArr[2] = true;
    }
    checkAllInput();
});

function  checkPicType(picFiles) {
    var reg = /\.(jpg|png|JPG|PNG)$/;
    for(var i=0, len=picFiles.length; i<len; i++){
        if(!reg.test(picFiles[i].name)){
            return false;
        }
    }
    return true;
}

$('#pics').change(function () {
    var pics = document.getElementById('pics');
    var picFiles = pics.files;
    console.log(picFiles);
    var picNum = picFiles.length;
    console.log(picNum)
    var picsTip = $('#pics-tip');
    if(picNum < 1){
        picsTip.text("亲，不添加图片，则按上次提交的商品图片展示~");
        picsTip.addClass("normal-tip");
        passArr[3] = true;
    }else if(picNum > 5){
        picsTip.text("亲，最多只能添加5张图片哦~");
        picsTip.removeClass("normal-tip");
        picsTip.show();
        passArr[3] = false;
    }else if(!checkPicType(picFiles)){
        picsTip.text("亲，只能添加格式为jpg或png的图片哦~");
        picsTip.removeClass("normal-tip");
        picsTip.show();
        passArr[3] = false;
    }else {
        picsTip.text("已选择了" + picNum + "张图片");
        picsTip.addClass("normal-tip");
        passArr[3] = true;
    }

    checkAllInput();
});

function checkAllInput() {
    var btn = $('#regist-btn');
    for(var i=0; i<passArr.length; i++){
        if(passArr[i] == false){
            btn.removeClass('active');
            return false;
        }
    }
    btn.addClass('active');
    return true;
}

$('#form-goodModify').submit(function(){

    if (!checkAllInput()) {
        alert('请完善商品信息~');
        return false;
    }

    var data = new FormData($('#form-goodModify')[0]);
    console.log(data);

    $.ajax({
        type: 'POST',
        data: data,
        dataType: 'json',
        url: '/checkGoodModify',
        contentType: false,
        processData: false
    })
    .done(function(results){
        console.log(results);
        if (results.success == true) {
            alert("修改商品成功！");
            window.location.href = '/goodDetail?goodId=' + results.goodId;
        }
    })
    .fail(function (results) {
        console.log(results);
        alert("修改商品失败！");
    });

    return false;
});