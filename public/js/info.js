var passArr = [true, true, true]; // 分别对应地址、长号、图片

$('#btn-edit').click(function(){
	$('#info1').hide();
	$('#info2').show();
})

$('#trigger-password').click(function(){
	$('#password-div1').hide();
	$('#password-div2').show();
    $('#oldPassword').focus();
})


$('#input-portrait').change(function () {
    console.log(77)
    previewImg(this.id, 'portrait');
})

/**
 * 从file域中获取本地图片的url
 * @param sourceId
 */
function getFileUrl(sourceId) {
    var url;
    if (navigator.userAgent.indexOf("MSIE") >= 1) {             // IE
        url = document.getElementById(sourceId).value;
    } else if(navigator.userAgent.indexOf("Firefox") > 0) {    // Firefox
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    } else if(navigator.userAgent.indexOf("Chrome") > 0) {     // Chrome
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    return url;
}

/**
 * 将选中的本地图片显示出来
 * @param sourceId
 * @param targetId
 */
function previewImg(sourceId, targetId) {
    var url = getFileUrl(sourceId);
    var sourceObj = $('#'+sourceId);
    var picType = sourceObj.val();
    console.log(picType);

    if(picType == "") {
        alert("亲~ 请添加头像");
        passArr[2] = false;
    }else if(!/\.(jpg|png|JPG|PNG)$/.test(picType)) {
        alert("亲~ 图片格式只能为jpg或png");
        passArr[2] = false;
    }else {
        $('#'+targetId).attr('src', url);
        passArr[2] = true;
    }

    checkAllInput();
}


function checkAllInput() {
    var btn = $('#btn-save');
    for(var i=0; i<passArr.length; i++){
        if(passArr[i] == false){
            btn.removeClass('active');
            return false;
        }
    }
    btn.addClass('active');
    return true;
}

$('#addr').blur(function () {
    var val = $(this).val();
    var addrTip = $('#addr-tip');
    if(val == "") {
        addrTip.text("❤ 当前住址不能为空");
        addrTip.show();
        passArr[0] = false;
    }else {
        addrTip.text("");
        addrTip.hide();
        passArr[0] = true;
    }
    checkAllInput();
});

$('#longPhone').blur(function () {
    var val = $(this).val();
    var lPhoneTip = $('#lPhone-tip');
    var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    if(val == "") {
        lPhoneTip.text("❤ 手机长号不能为空");
        lPhoneTip.show();
        passArr[1] = false;
    }else if(reg.test(val) == true){
        lPhoneTip.text("");
        lPhoneTip.hide();
        passArr[1] = true;
    }else {
        lPhoneTip.text("❤ 手机号格式不正确");
        lPhoneTip.show();
        passArr[1] = false;
    }
    checkAllInput();
});


$('#form-info').submit(function(e){
    if (passArr[0] == false) {
        alert('请完善地址信息~');
        return false;
    }
    if (passArr[1] == false) {
        alert('请完善手机长号信息~');
        return false;
    }
    if (passArr[2] == false) {
        alert('请完善图片信息~');
        return false;
    }

    if($('#input-portrait').val() == "") {
        alert("亲~ 请添加头像");
        $('#btn-save').removeClass('active');
        return false;
    }

    var data = new FormData($('#form-info')[0]);
    console.log(data);

    $.ajax({
        type: 'POST',
        data: data,
        dataType: 'json',
        url: '/user/checkInfo',
        contentType: false,
        processData: false
    })
    .done(function(results){
        console.log(results);
        if (results.success == true) {
            window.location.href = '/user?userId=' + results.userId;
        }
    })
    .fail(function (results) {
        console.log(results);
        alert("修改个人信息失败！");
    })

    return false;
});

var passArr1  = [false, false, false]; // 分别对应原密码、新密码、确认密码

$('#oldPassword').blur(function () {
    var val = $(this).val();
    var oldPwdTip = $('#oldPwd-tip');
    if(val == "") {
        oldPwdTip.text("❤ 原密码不能为空");
        oldPwdTip.show();
        passArr1[0] = false;
    }else {
        oldPwdTip.text("");
        oldPwdTip.hide();
        passArr1[0] = true;
    }
    checkAllInput1();
});

function checkAllInput1() {
    var btn = $('#btn-save2');
    for(var i=0; i<passArr1.length; i++){
        if(passArr1[i] == false){
            btn.removeClass('active');
            return false;
        }
    }
    btn.addClass('active');
    return true;
}


$('#newPassword').blur(function () {
    var val = $(this).val();
    var newPwdTip = $('#newPwd-tip');
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
    if(val == "") {
        newPwdTip.text("❤ 新密码不能为空");
        newPwdTip.show();
        passArr1[1] = false;
    }else if(reg.test(val) == true){
        newPwdTip.text("");
        newPwdTip.hide();
        passArr1[1] = true;
    }else {
        newPwdTip.text("❤ 密码必须由6-10位英文和数字组成，不能包含其它字符");
        newPwdTip.show();
        passArr1[1] = false;
    }
    checkAllInput1();
});

$('#newPassword').focus(function () {
    var newPwdTip = $('#newPwd-tip');
    newPwdTip.text("❤ 密码必须由6-10位英文和数字组成，不能包含其它字符");
    newPwdTip.show();
});

$('#newPassword2').blur(function () {
    var val = $(this).val();
    var pwdVal = $('#newPassword').val();
    var newPwd2Tip = $('#newPwd2-tip');
    if(val == "") {
        newPwd2Tip.text("❤ 确认密码不能为空");
        newPwd2Tip.show();
        passArr1[2] = false;
    }else if(val === pwdVal){
        newPwd2Tip.text("");
        newPwd2Tip.hide();
        passArr1[2] = true;
    }else {
        newPwd2Tip.text("❤ 两次密码输入不一致");
        newPwd2Tip.show();
        passArr1[2] = false;
    }
    checkAllInput1();
});

$('#btn-save2').click(function () {
    console.log(passArr1);
    if (checkAllInput1() == true){
        var data = {
            oldPwd: $('#oldPassword').val(),
            newPwd: $('#newPassword').val()
        }
        console.log(data);
        $.ajax({
            url: "/user/checkPwd",
            type: "POST",
            dataType: "json",
            data: data
        })
        .done(function (results) {
            console.log(results);
            if(results.success == true) {
                alert("修改密码成功~");
                $('#password-div2').hide();
                $('#password-div1').show();
            }else if(results.success == false){
                alert("原密码不正确~");
            }else {
                alert("修改密码失败！");
            }
        })
        .fail(function (results) {
            console.log(results);
            alert("修改密码失败！");
        });
        $('#oldPassword').val("");
        $('#newPassword').val("");
        $('#newPassword2').val("");
    }else {
        alert("亲，请完善密码信息~");
    }
    return false;
});

