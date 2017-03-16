var Good = require('../models/good');
var User = require('../models/user');

var moment = require('moment');

module.exports.getCollectGood = function (req, res) {
    var _user = req.session.user;
    if(_user){
        User.findById(_user._id)
            .populate('myCollections')
            .populate('myReceiveMessages')
            .exec(function (error, user) {
                if(error){
                    console.log('Fail to find user', error);
                }else{
                    console.log('user: ', user);
                    var noReadNum = 0;
                    for(var i=0, len=user.myReceiveMessages.length; i<len; i++){
                        if(user.myReceiveMessages[i].isRead == false){
                            noReadNum++;
                        }
                    }
                    console.log("noReadNum: ", noReadNum);

                    if(user.myCollections.length == 0){
                        res.render('commonGood', {
                            "hasLogin": true,
                            "sessionUser": user,
                            "activeIndex": 0,
                            "noReadNum": noReadNum,
                            "moment": moment,
                            "isCollect": true,
                            "goods": user.myCollections
                        });
                    }else {
                        var isCollect = true;
                        dealGood(res, user, noReadNum, isCollect, user.myCollections, user.myCollections.length-1);
                    }
                }
            })
    }else{
        res.redirect('/index');
    }
};

function dealGood(res, user, noReadNum, isCollect, goods, index) {
    User.findById(goods[index].ownerId)
        .exec(function (error, u) {
            if(error){
                console.log("Fail to find good's user", error);
            }else{
                console.log("The good's user: ", u);
                goods[index].ownerId = u;
                if(index == 0){
                    console.log('goods: ', goods);

                    var tempArr = [];
                    for(var i=goods.length-1; i>=0; i--){
                        if((goods[i].hasApprove==false)||(goods[i].approveStatus==false)){
                            goods[i].isEnter = 0;
                        }else if(goods[i].ownerId.isShield == true){
                            goods[i].isEnter = 1;
                        }else{
                            goods[i].isEnter = 2;
                        }
                        tempArr.push(goods[i]);
                    }
                    goods = tempArr.slice(0, tempArr.length);

                    res.render('commonGood', {
                        "hasLogin": true,
                        "sessionUser": user,
                        "activeIndex": 0,
                        "noReadNum": noReadNum,
                        "moment": moment,
                        "isCollect": isCollect,
                        "goods": goods
                    });
                }else{
                    dealGood(res, user, noReadNum, isCollect, goods, index-1)
                }
            }
        })
}

module.exports.getCommentGood = function (req, res) {
    var _user = req.session.user;
    if(_user){
        User.findById(_user._id)
            .populate('myCommentGoods')
            .populate('myReceiveMessages')
            .exec(function (error, user) {
                if(error){
                    console.log('Fail to find user', error);
                }else{
                    console.log('user: ', user);
                    var noReadNum = 0;
                    for(var i=0, len=user.myReceiveMessages.length; i<len; i++){
                        if(user.myReceiveMessages[i].isRead == false){
                            noReadNum++;
                        }
                    }
                    console.log("noReadNum: ", noReadNum);

                    if(user.myCommentGoods.length == 0){
                        res.render('commonGood', {
                            "hasLogin": true,
                            "sessionUser": user,
                            "activeIndex": 0,
                            "noReadNum": noReadNum,
                            "moment": moment,
                            "isCollect": false,
                            "goods": user.myCommentGoods
                        });
                    }else {
                        var isCollect = false;
                        dealGood(res, user, noReadNum, isCollect, user.myCommentGoods, user.myCommentGoods.length-1);
                    }
                }
            })
    }else{
        res.redirect('/index');
    }
};