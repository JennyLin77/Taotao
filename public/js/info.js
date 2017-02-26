$('#btn-edit').click(function(){
	$('#info1').hide();
	$('#info2').show();
})

$('#btn-save').click(function(){
	$('#info2').hide();
	$('#info1').show();
})

$('#trigger-password').click(function(){
	$('#password-div1').hide();
	$('#password-div2').show();
})

$('#btn-save2').click(function(){
	$('#password-div2').hide();
	$('#password-div1').show();
})