var contentPass = false;  // 消息内容是否通过

$(document).ready(function () {
    var msgTitle = $('#messageTitle').val();
    if(msgTitle.indexOf('回复：回复：') == 0){
        msgTitle = msgTitle.substring(3, msgTitle.length);
        $('#messageTitle').val(msgTitle);
    }
})

$(".btn-reply").click(function () {
    $(".message-container").show();
    $("body").addClass('noScroll');

    $('#content').focus();
    $('#content').val("");
    $('#content-tip').hide();
    contentPass = false;
    checkInput();
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


$('#content').blur(function () {
    var val = $(this).val();
    var contentTip = $('#content-tip');
    if(val == "") {
        contentTip.text("❤ 消息内容不能为空");
        contentTip.show();
        contentPass = false;
    }else {
        contentTip.text("");
        contentTip.hide();
        contentPass = true;
    }
    checkInput();
});

function checkInput() {
    var btn = $('#btn-send');
    if(contentPass == false){
        btn.removeClass('active');
        return false;
    }else {
        btn.addClass('active');
        return true;
    }
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