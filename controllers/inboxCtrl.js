var User = require('../models/user');
var Message = require('../models/message');

var moment = require('moment');

module.exports.getInbox = function (req, res) {
    var _user = req.session.user;
    if(_user){
        User.findById(_user._id)
            .populate('myReceiveMessages')
            .exec(function (error, user) {
                if(error) {
                    console.log(error);
                }else{
                    if (user.myReceiveMessages.length == 0) {
                        res.render('inbox', {
                            "hasLogin": true,
                            "sessionUser": user,
                            "activeIndex": 0,
                            "noReadNum": 0,
                            "moment": moment
                        });
                    } else {
                        var noReadNum = 0;
                        for(var i=0, len=user.myReceiveMessages.length; i<len; i++){
                            if(user.myReceiveMessages[i].isRead == false){
                                noReadNum++;
                            }
                        }
                        console.log("noReadNum: ", noReadNum);
                        res.render('inbox', {
                            "hasLogin": true,
                            "sessionUser": user,
                            "activeIndex": 0,
                            "noReadNum": noReadNum,
                            "moment": moment
                        });
                    }
                }
            });
    }else{
        res.redirect('/index');
    }
};

module.exports.doRead = function (req, res) {
    var _user = req.session.user;
    if(_user){
        Message.update({receiverName: _user.userName}, {$set: {isRead: true}}, {multi: true}, function (error) {
            if(error){
                console.log(error);
            }else{
                User.findById(_user._id)
                    .populate('myReceiveMessages')
                    .exec(function (error, user) {
                        if(error) {
                            console.log(error);
                        }else{
                            if (user.myReceiveMessages.length == 0) {
                                res.render('inbox', {
                                    "hasLogin": true,
                                    "sessionUser": user,
                                    "activeIndex": 0,
                                    "noReadNum": 0,
                                    "moment": moment
                                });
                            } else {
                                var noReadNum = 0;
                                for(var i=0, len=user.myReceiveMessages.length; i<len; i++){
                                    if(user.myReceiveMessages[i].isRead == false){
                                        noReadNum++;
                                    }
                                }
                                console.log("noReadNum: ", noReadNum);
                                res.render('inbox', {
                                    "hasLogin": true,
                                    "sessionUser": user,
                                    "activeIndex": 0,
                                    "noReadNum": noReadNum,
                                    "moment": moment
                                });
                            }
                        }
                    });
            }
        });












    }else{
        res.redirect('/index');
    }
};