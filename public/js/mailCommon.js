var mailItemObjs = [];
var mailItemSelects = [];
var selectNum = 0;

$(document).ready(function () {
    initData();
});

function initData() {
    mailItemObjs = $('.mail');
    console.log(mailItemObjs);
    mailItemSelects = [];
    for(var i=0, len=mailItemObjs.length; i<len; i++){
        var item = {
            msgId: mailItemObjs.eq(i).attr('dataId'),
            isSelect: false
        };
        mailItemSelects.push(item);
    }
    console.log(mailItemSelects);
    selectNum = 0;
}

$('.mail-header').on('click', '.box', function () {
    if(selectNum == mailItemObjs.length){
        selectNum = 0;
        for(var i=0, len=mailItemObjs.length; i<len; i++){
            mailItemObjs.eq(i).removeClass('selected');
            mailItemSelects[i].isSelect = false;
        }
    }else {
        selectNum = mailItemObjs.length;
        for(var i=0, len=mailItemObjs.length; i<len; i++){
            mailItemObjs.eq(i).addClass('selected');
            mailItemSelects[i].isSelect = true;
        }
    }
    dealTotalSelect(selectNum);
});

function  clearSelect() {
    selectNum = 0;
    $('.mail-header').removeClass('selected');
    for(var i=0, len=mailItemObjs.length; i<len; i++){
        mailItemObjs.eq(i).removeClass('selected');
        mailItemSelects[i].isSelect = false;
    }
}

$('.content-block').on('click', '.mail .box', function (e) {
    var mailItem = $(this).parent().parent();
    var index = mailItem.attr('index');
    mailItemSelects[index].isSelect = !mailItemSelects[index].isSelect;
    console.log(mailItemSelects[index].isSelect);
    if(mailItemSelects[index].isSelect == true){
        mailItem.addClass('selected');
        selectNum++;
    }else{
        mailItem.removeClass('selected');
        selectNum--;
    }

    dealTotalSelect(selectNum);
    e.stopPropagation();
});

function dealTotalSelect(selectNum) {
    var mailHeader = $('.mail-header');
    if(selectNum == mailItemObjs.length){
        mailHeader.addClass('selected');
    }else {
        mailHeader.removeClass('selected');
    }
}

$(".btn-hasRead").click(function () {
    var noReadNum = parseInt($('#noReadNum').text());
    console.log("noReadNum: ", noReadNum);
    if(noReadNum == 0){
        alert("亲，您没有未读消息~");
        clearSelect();
    }else {
        window.location.href = '/user/inbox/doRead';
    }
});

$('.btn-delete').click(function () {
    var selectedArr = [];
    for (var i = 0, len = mailItemSelects.length; i < len; i++) {
        if (mailItemSelects[i].isSelect == true) {
            selectedArr.push(mailItemSelects[i].msgId);
        }
    }

    if(mailItemObjs.length == 0){
        alert('亲，您没有信息可以删除~');
    }else if(selectedArr.length == 0){
        alert('请选择要删除的消息');
    }else{
        var blockNo = $('.nav-list').attr('blockNo');
        var data = {
            blockNo: blockNo,
            selectedArr: selectedArr.join('#')
        };
        console.log(data);

        $.ajax({
            data: data,
            dataType: "json",
            type: "POST",
            url: "/user/mailbox/doDelete"
        })
        .done(function (results) {
            console.log(results);
            if(results.success == true){
                window.location.href = results.href;
            }else {
                alert('删除失败');
                clearSelect();
            }
        })
        .fail(function (results) {
            console.log(results);
            alert('删除失败');
            clearSelect();
        });
    }
});


$('.mail').dblclick(function () {
    var blockNo = $('.nav-list').attr('blockNo');
    var msgId = $(this).attr('dataId');
    var data = {
        blockNo: blockNo,
        msgId: msgId
    };
    console.log(data);

    if(blockNo == "1" || $(this).hasClass('read')){
        window.location.href = '/user/mailbox/messageDetail?msgId=' + msgId + '&blockNo=' + blockNo;
    }else {
        $.ajax({
            data: data,
            dataType: "json",
            type: "POST",
            url: "/user/mailbox/doMessageDetail"
        })
        .done(function (results) {
            console.log(results);
            if(results.success == true){
                window.location.href = results.href;
            }else {
                alert('读取消息失败');
            }
        })
        .fail(function (results) {
            console.log(results);
            alert('读取消息失败');
        });
    }
})