var passArr = [false, false, false, false, false]; // 分别对应名字、密码、确认密码、地址、长号

function checkAllInput() {
    var btn = $('#regist-btn');
    for(var i=0; i<passArr.length; i++){
        if(passArr[i] == false){
            btn.addClass('disabled');
            return false;
        }
    }
    btn.removeClass('disabled');
    return true;
}

$('#username').blur(function() {
	var val = $(this).val();
	var usernameTip = $('#username-tip');
	if(val == "") {
        usernameTip.text("用户名不能为空");
        usernameTip.show();
        passArr[0] = false;
        checkAllInput();
	}else {
		var data = {
			username: val
		};
		$.ajax({
			url: "/regist/checkUsername",
			type: "POST",
            dataType: "json",
            data: data
		})
		.done(function (results) {
			console.log(results);
			if(results.isExit == true) {
				usernameTip.text(results.message);
				usernameTip.show();
                passArr[0] = false;
			}else {
				usernameTip.text("");
				usernameTip.hide();
                passArr[0] = true;
			}
            checkAllInput();
		})
		.fail(function (results) {
			console.log(results.message);
            checkAllInput();
        });
	}
});

$('#password1').blur(function () {
    var val = $(this).val();
    var password1Tip = $('#password1-tip');
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
    if(val == "") {
        password1Tip.text("密码不能为空");
        password1Tip.show();
        passArr[1] = false;
    }else if(reg.test(val) == true){
        password1Tip.text("");
        password1Tip.hide();
        passArr[1] = true;
    }else {
        password1Tip.text("密码必须由6-10位英文和数字组成，不能包含其它字符");
        password1Tip.show();
        passArr[1] = false;
	}
    checkAllInput();
});

$('#password1').focus(function () {
    var password1Tip = $('#password1-tip');
    password1Tip.text("密码必须由6-10位英文和数字组成，不能包含其它字符");
    password1Tip.show();
});

$('#password2').blur(function () {
    var val = $(this).val();
    var passwordVal = $('#password1').val();
    var password2Tip = $('#password2-tip');
    if(val == "") {
        password2Tip.text("密码不能为空");
        password2Tip.show();
        passArr[2] = false;
    }else if(val === passwordVal){
        password2Tip.text("");
        password2Tip.hide();
        passArr[2] = true;
    }else {
        password2Tip.text("两次密码输入不一致");
        password2Tip.show();
        passArr[2] = false;
    }
    checkAllInput();
});

$('#addr').blur(function () {
	var val = $(this).val();
    var addrTip = $('#addr-tip');
    if(val == "") {
        addrTip.text("当前住址不能为空");
        addrTip.show();
        passArr[3] = false;
    }else {
        addrTip.text("");
        addrTip.hide();
        passArr[3] = true;
    }
    checkAllInput();
});

$('#lPhone').blur(function () {
    var val = $(this).val();
    var lPhoneTip = $('#lPhone-tip');
    var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    if(val == "") {
        lPhoneTip.text("手机长号不能为空");
        lPhoneTip.show();
        passArr[4] = false;
    }else if(reg.test(val) == true){
        lPhoneTip.text("");
        lPhoneTip.hide();
        passArr[4] = true;
    }else {
        lPhoneTip.text("手机号格式不正确");
        lPhoneTip.show();
        passArr[4] = false;
    }
    checkAllInput();
});


$('#regist-btn').click(function () {
    console.log(passArr);
    if (checkAllInput() == true){
        var data = {
            username: $('#username').val(),
            password: $('#password1').val(),
            address: $('#addr').val(),
            lPhone: $('#lPhone').val(),
            sPhone: $('#sPhone').val(),
            wechat: $('#wechat').val(),
            qq: $('#qq').val()
        }
        console.log(data);
        $.ajax({
            url: "/regist/doRegist",
            type: "POST",
            dataType: "json",
            data: data
        })
        .done(function (results) {
            console.log(results);
            if(results.success == true) {
                alert("注册成功! 已自动登录，将跳转至主页~");
                window.location.href = '/index';
            }else if(results.success == false){
                alert(results.message);
            }else {
                alert("注册失败，请重新注册~");
            }
        })
        .fail(function (results) {
            console.log(results);
            alert("注册失败，请重新注册~");
        });
    }else {
        alert("亲，请完善注册信息~");
    }
    return false;
});

$(document).ready(function () {
    $('#username').val("");
    $('#password1').val("");
    $('#password2').val("");
    $('#addr').val("");
    $('#lPhone').val("");
    $('#sPhone').val("");
    $('#wechat').val("");
    $('#qq').val("");
})
