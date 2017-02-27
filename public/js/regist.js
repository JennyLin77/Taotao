var isNamePass = false;

$('#username').blur(function() {
	var val = $(this).val();
	var usernameTip = $('#username-tip');
	if(val == undefined || val == "") {
        usernameTip.text("用户名不能为空");
        usernameTip.show();
		isNamePass = false;
	}else {
		var data = {
			username: val
		};
		console.log(data);
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
				isNamePass = false;
			}else {
				usernameTip.text("");
				usernameTip.hide();
				isNamePass = true;
			}
		})
		.fail(function (results) {
			console.log(results.message);
        });
	}
})

