$('.table').on('click', 'button', function () {
    var isShield = false;
    if($(this).text() == '解除屏蔽'){
        isShield = true;
    }
    var userId = $(this).parent().parent().attr('dataId');
    var data = {
        isShield: !isShield,
        userId: userId
    };
    console.log(data);

    $.ajax({
        data: data,
        dataType: "json",
        type: "POST",
        url: "/user/adminUser/doShield"
    })
    .done(function (results) {
        console.log(results);
        if(results.success == true){
            var trObj = $('#tr-' + results.userId);
            if(results.isShield == true){
                trObj.find('.shield-text').html("是");
                var btn = trObj.find('button');
                btn.html('解除屏蔽').addClass('btn-normal').removeClass('btn-dangerous');
            }else{
                trObj.find('.shield-text').html("否");
                var btn = trObj.find('button');
                btn.html('屏&nbsp;蔽').addClass('btn-dangerous').removeClass('btn-normal');
            }
        }else {
            alert('操作失败');
        }
    })
    .fail(function (results) {
        console.log(results);
        alert('操作失败');
    });
});

$('.search-div').click(function () {
    var searchVal = $('#search-input').val();
    searchVal = searchVal.replace(/(^\s*)|(\s*$)/g, "");

    window.location.href = '/user/adminUser/doSearch?searchVal='+searchVal;
});