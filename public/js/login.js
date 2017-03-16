var passArr = [false, false];

$('#input-name').blur(function() {
    var val = $(this).val();
    var usernameTip = $('#name-tip');
    if(val == "") {
        usernameTip.text("❤ 用户名不能为空");
        usernameTip.show();
        passArr[0] = false;
    }else {
        var data = {
            username: val
        };
        $.ajax({
            url: "/login/checkUsername",
            type: "POST",
            dataType: "json",
            data: data
        })
        .done(function (results) {
            console.log(results);
            if(results.isExit == true) {
                usernameTip.text("");
                usernameTip.hide();
                passArr[0] = true;
            }else {
                usernameTip.text("❤ 用户名不存在");
                usernameTip.show();
                passArr[0] = false;
            }
        })
        .fail(function (results) {
            console.log(results);
        });
    }
});

$('#input-password').blur(function() {
    var val = $(this).val();
    var passwordTip = $('#password-tip');
    if(val == "") {
        passwordTip.text("❤ 密码不能为空");
        passwordTip.show();
        passArr[1] = false;
    }else {
        passwordTip.text("");
        passwordTip.hide();
        passArr[1] = true;
    }
});

$('#btn-login').click(function () {
    console.log(passArr);
    if (passArr[0]==true && passArr[1]==true){
        var data = {
            username: $('#input-name').val(),
            password: $('#input-password').val()
        };
        console.log(data);
        $.ajax({
            url: "/login/doLogin",
            type: "POST",
            dataType: "json",
            data: data
        })
        .done(function (results) {
            console.log(results);
            if(results.success == true) {
                console.log(results)
                window.location.href = '/index';
            }else {
                var passwordTip = $('#password-tip');
                passwordTip.text("❤ 密码错误");
                passwordTip.show();
                passArr[1] = false;
                passwordTip.focus();
            }
        })
        .fail(function (results) {
            alert("登录失败，麻烦亲重新登录~");
            console.log(results.message);
        });
    }else {
        alert("亲，请完善登录信息~");
    }
    return false;
});


