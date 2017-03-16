var passArr = [false, false];  // 分别对应消息标题、内容

$("#btn-contact").click(function () {
    $(".message-container").show();
    $("body").addClass('noScroll');

    $('#messageTitle').focus();
    $('#messageTitle').val("");
    $('#content').val("");
    $('#messageTitle-tip').hide();
    $('#content-tip').hide();
    passArr = [false, false];
    checkAllInput();
});

function closeMsg() {
    $('.message-container').hide();
    $("body").removeClass('noScroll');
}

$('#btn-close').click(function () {
    closeMsg();
});

$('#a-close').click(function () {
    closeMsg();
});

$('#messageTitle').blur(function () {
    var val = $(this).val();
    var messageTitleTip = $('#messageTitle-tip');
    if(val == "") {
        messageTitleTip.text("❤ 消息标题不能为空");
        messageTitleTip.show();
        passArr[0] = false;
    }else {
        messageTitleTip.text("");
        messageTitleTip.hide();
        passArr[0] = true;
    }
    checkAllInput();
});

$('#content').blur(function () {
    var val = $(this).val();
    var contentTip = $('#content-tip');
    if(val == "") {
        contentTip.text("❤ 消息内容不能为空");
        contentTip.show();
        passArr[1] = false;
    }else {
        contentTip.text("");
        contentTip.hide();
        passArr[1] = true;
    }
    checkAllInput();
});

function checkAllInput() {
    var btn = $('#btn-send');
    for(var i=0; i<passArr.length; i++){
        if(passArr[i] == false){
            btn.removeClass('active');
            return false;
        }
    }
    btn.addClass('active');
    return true;
}

$('#btn-send').click(function () {
    var msgTitle = $('#messageTitle').val();
    var receiverName = $('#receiver').val();
    var senderName = $('#sender').val();
    var receiverId = $('#receiver').attr('dataId');
    var senderId = $('#sender').attr('dataId');
    var content = $('#content').val();

    var data = {
        msgTitle: msgTitle,
        receiverName: receiverName,
        senderName: senderName,
        receiverId: receiverId,
        senderId: senderId,
        content: content
    };
    console.log(data);
    $.ajax({
        data: data,
        dataType: "json",
        type: "POST",
        url: "/user/message/doSend"
    })
    .done(function (results) {
        console.log(results);
        if(results.success == true){
            closeMsg();
            alert('消息发送成功');
        }else {
            alert('消息发送失败');
        }
    })
    .fail(function (results) {
        console.log(results);
        alert('消息发送失败');
    });
})