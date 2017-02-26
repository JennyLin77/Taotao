isNamePass = false;

$("#username").blur(function() {
	var val = $(this).val();
	if(val == undefined || val == "") {
		$("#username-tip").text("用户名不能为空");
		$("#username-tip").show();
		isNamePass = false;
	}else {
		var data = {
			username: val
		};
		$.ajax({
			type: 'POST',
			data: data,
			datatype: json,
			

		})

		/*$("#username-tip").hide();
		isNamePass = true;*/
	}
})

