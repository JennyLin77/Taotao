$('#nav-list li').click(function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    var index = $(this).attr('index');
    var activeContent = $('#content'+index);
    activeContent.show();
    activeContent.siblings('.content').hide();
});

$('.pic-list li img').click(function () {
   var src = $(this).attr('src');
    $('.display-block img').attr('src', src);
});

$('#content2').on('keyup', 'textarea', function () {
    var maxLen = 100;  //最大字符个数
    var obj = $(this);
    var val = obj.val();
    var len = val.length;  //当前已用字符数
    if (len > maxLen) {
        obj.val(val.substring(0, maxLen));   //超出时截取掉字符
        len = maxLen;
    }
    var remlen = maxLen - len;
    obj.siblings('span').find('.textNum').html(remlen);
});

$('#btn-collect').click(function () {
    var goodId = $('#goodTitle').attr('data-id');
    var isCollectText = $('#btn-collect').text();
    console.log(isCollectText);
    var isCollect = true;
    if(isCollectText != '收藏'){
        isCollect = false;
    }

    var data = {
        isCollect: isCollect,
        goodId: goodId
    };
    console.log(data);
    $.ajax({
        data: data,
        dataType: "json",
        type: "POST",
        url: "/goodDetail/doCollect"
    })
    .done(function (results) {
        console.log(results);
        if(results.success == true){
            if(results.isCollect == true){
                $('#btn-collect').html("已收藏");
            }else{
                $('#btn-collect').html("收藏");
            }
            $('#collectNum').text(results.collectNum);
        }
    })
    .fail(function (results) {
        console.log(results);
        if(isCollect == true){
            alert("收藏失败");
        }else{
            alert("取消收藏失败");
        }
    });
});

$('#btn-comment').click(function () {
    var goodId = $('#goodTitle').attr('data-id');
    var content = $('#textarea-comment').val();
    var obj = $(this);

    var data = {
        content: content,
        goodId: goodId
    };
    console.log(data);
    $.ajax({
        data: data,
        dataType: "json",
        type: "POST",
        url: "/goodDetail/doComment"
    })
    .done(function (results) {
        console.log(results);
        if(results.success == true){
            var comment = results.comment;
            var user = results.user;
            $('#textarea-comment').val("");
            obj.siblings('span').find('.textNum').html(100);
            $('#totalCommentNum').html(results.commentNum);

            var isInsert = false;
            var commentList = document.getElementById('comment-list');
            console.log(commentList);
            if(!commentList){
                commentList = document.createElement('ul');
                commentList.className = 'comment-list';
                commentList.id = 'comment-list';
                isInsert = true;
            }

            var commentItem = document.createElement('li');
            commentItem.setAttribute('dataId', comment._id);
            commentItem.className = 'comment-item';
            var commentDiv = document.createElement('div');
            commentDiv.className = 'comment';

            var imgObj = document.createElement('img');
            if(user.portraitUrl){
                imgObj.src = '/image?imageId=' + user.portraitUrl;
            }else {
                imgObj.src = '../img/default-user.png';
            }
            commentDiv.appendChild(imgObj);

            var textDiv = document.createElement('div');
            textDiv.className = 'text-div';
            textDiv.innerHTML = '<h6>' + user.userName + '</h6>'
                                + '<span class="time">' + moment(comment.created).format("YYYY-MM-DD HH:mm:ss") + '</span>'
                                + '<p>' + comment.content + '</p>'
                                + '<a href="javascript:;" class="reply-toggle">回复</a>';
            commentDiv.appendChild(textDiv);

            var commentBlock = document.createElement('div');
            commentBlock.className = 'comment-block';
            commentBlock.innerHTML = '<textarea placeholder="写下你的回复......"></textarea>'
                                    + '<span>还可以输入<span class="textNum">100</span>字</span>'
                                    + '<button class="btn btn-reply">回复</button>';
            commentDiv.appendChild(commentBlock);

            commentItem.appendChild(commentDiv);
            commentList.appendChild(commentItem);
            if(isInsert == true){
                document.getElementById('content2').appendChild(commentList);
            }
        }
    })
    .fail(function (results) {
        console.log(results);
        alert('留言失败');
    });
});

$('#content2').on('click', '.reply-toggle', function () {
    var aText = $(this).text();
    if(aText == '回复'){
        $(this).text('收起回复');
        $(this).parent().siblings('.comment-block').show();
    }else {
        $(this).text('回复');
        $(this).parent().siblings('.comment-block').hide();
    }
});

$('#content2').on('click', '.btn-reply', function () {
    var obj = $(this);
    var goodId = $('#goodTitle').attr('data-id');
    var commentId = obj.parent().parent().parent().attr('dataId');
    var content = obj.siblings('textarea').val();

    var data = {
        goodId: goodId,
        commentId: commentId,
        content: content
    };
    console.log(data);
    $.ajax({
        data: data,
        dataType: "json",
        type: "POST",
        url: "/goodDetail/doReply"
    })
    .done(function (results) {
        console.log(results);
        if(results.success == true){
            var subComment = results.subComment;
            var user = results.user;
            obj.siblings('textarea').val("");
            obj.siblings('span').find('.textNum').html(100);

            var isInsert = false;
            var subCommentList = obj.parent().siblings('.subcomment-list');
            console.log(subCommentList.length);
            if(subCommentList.length == 0){
                subCommentList = $('<ul class="subcomment-list"></ul>');
                isInsert = true;
            }

            var subCommentItem = $('<li class="subcomment-item comment"></li>');

            var imgObj = $('<img>');
            if(user.portraitUrl){
                imgObj.attr('src', '/image?imageId=' + user.portraitUrl);
            }else {
                imgObj.attr('src', '../img/default-user.png');
            }
            subCommentItem.append(imgObj);

            var textDiv = $('<div class="text-div"></div>');
            var textDivHtml = '<h6>' + user.userName + '</h6>'
                            + '<span class="time">' + moment(subComment.created).format("YYYY-MM-DD HH:mm:ss") + '</span>'
                            + '<p>' + subComment.content + '</p>';
            textDiv.html(textDivHtml);
            subCommentItem.append(textDiv);

            subCommentList.append(subCommentItem);
            if(isInsert == true){
                subCommentList.insertBefore(obj.parent());
            }
        }
    })
    .fail(function (results) {
        console.log(results);
        alert('回复评论失败');
    });
})


