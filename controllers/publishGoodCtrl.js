var Good = require('../models/good');
var User = require('../models/user');

var moment = require('moment');

module.exports.getPublishGood = function (req, res) {
    var _user = req.session.user;
    if(_user){
        User.findById(_user._id)
            .populate('myGoods')
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

                    var goods = user.myGoods.reverse();

                    res.render('publishGood', {
                        "hasLogin": true,
                        "sessionUser": user,
                        "activeIndex": 0,
                        "noReadNum": noReadNum,
                        "moment": moment,
                        "goods": goods
                    });
                }
            })
    }else{
        res.redirect('/index');
    }
};