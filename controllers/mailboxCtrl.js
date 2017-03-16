var mongoose = require('mongoose');
var User = require('../models/user');
var Message = require('../models/message');
var ObjectId = mongoose.Schema.Types.ObjectId;

var moment = require('moment');

module.exports.doDelete = function (req, res) {
    var _user = req.session.user;
    if(_user){
        User.findById(_user._id)
            .exec(function (error, user) {
                if(error){
                    console.log('Fail to find user', error);
                    res.json({
                        "success": false,
                        "message": '查找用户失败'
                    });
                }else{
                    console.log('After find user: ', user);
                    var selectedArr = req.body.selectedArr.split('#');
                    console.log(selectedArr);
                    if(req.body.blockNo == '0'){
                        for(var i=0, len1=selectedArr.length; i<len1; i++){
                            for(var j=0, len2=user.myReceiveMessages.length; j<len2; j++){
                                if(selectedArr[i].toString() == user.myReceiveMessages[j].toString()){
                                    user.myReceiveMessages.splice(j, 1);
                                    break;
                                }
                            }
                        }
                    }else{
                        for(var i=0, len1=selectedArr.length; i<len1; i++){
                            for(var j=0, len2=user.mySendMessages.length; j<len2; j++){
                                if(selectedArr[i].toString() == user.mySendMessages[j].toString()){
                                    user.mySendMessages.splice(j, 1);
                                    break;
                                }
                            }
                        }
                    }
                    user.save(function (error, u) {
                        if(error){
                            console.log('Fail to save user', error);
                            res.json({
                                "success": false,
                                "message": '保存用户失败'
                            });
                        }else{
                            console.log('After save user: ', u);
                            if(req.body.blockNo == '0'){
                                res.json({
                                    "success": true,
                                    "href": "/user/inbox"
                                });
                            }else{
                                res.json({
                                    "success": true,
                                    "href": "/user/sendbox"
                                });
                            }
                        }
                    })
                }
            })
    }else{
        res.redirect('/index');
    }
};

module.exports.doDeleteOne = function (req, res) {
    var _user = req.session.user;
    if(_user){
        User.findById(_user._id)
            .exec(function (error, user) {
                if(error){
                    console.log('Fail to find user', error);
                    res.json({
                        "success": false,
                        "message": '查找用户失败'
                    });
                }else{
                    console.log('After find user: ', user);
                    if(req.query.blockNo == '0'){
                        for(var i=0, len=user.myReceiveMessages.length; i<len; i++){
                            if(req.query.msgId.toString() == user.myReceiveMessages[i].toString()){
                                user.myReceiveMessages.splice(i, 1);
                                break;
                            }
                        }
                    }else{
                        for(var i=0, len=user.mySendMessages.length; i<len; i++){
                            if(req.query.msgId.toString() == user.mySendMessages[i].toString()){
                                user.mySendMessages.splice(i, 1);
                                break;
                            }
                        }
                    }
                    user.save(function (error, u) {
                        if(error){
                            console.log('Fail to save user', error);
                            res.json({
                                "success": false,
                                "message": '保存用户失败'
                            });
                        }else{
                            console.log('After save user: ', u);
                            if(req.query.blockNo == '0'){
                                res.redirect('/user/inbox');
                            }else{
                                res.redirect('/user/sendbox');
                            }
                        }
                    })
                }
            })
    }else{
        res.redirect('/index');
    }
}

module.exports.doMessageDetail = function (req, res) {
    var _user =  req.session.user;
    if(_user){
        Message.findById(req.body.msgId)
            .exec(function (error, msg) {
                if(error){
                    console.log('Fail to find message', error);
                    res.json({
                        "success": false,
                        "message": "查找消息失败"
                    });
                }else{
                    msg.isRead = true;
                    msg.save(function (error, message) {
                        if(error){
                            console.log('Fail to save message', error);
                            res.json({
                                "success": false,
                                "message": "保存消息失败"
                            });
                        }else{
                            res.json({
                                "success": true,
                                "href": '/user/mailbox/messageDetail?msgId=' + message._id + '&blockNo=' + req.body.blockNo
                            });
                        }
                    })
                }
            })
    }else {
        res.redirect('/index');
    }
};

module.exports.getMessageDetail = function (req, res) {
    var _user = req.session.user;
    if(_user){
        User.findById(_user._id)
            .populate('myReceiveMessages')
            .exec(function (error, user) {
                if(error) {
                    console.log(error);
                }else{
                    var noReadNum = 0;
                    for(var i=0, len=user.myReceiveMessages.length; i<len; i++){
                        if(user.myReceiveMessages[i].isRead == false){
                            noReadNum++;
                        }
                    }
                    console.log("noReadNum: ", noReadNum);

                    Message.findById(req.query.msgId)
                        .populate('senderId')
                        .exec(function (error, message) {
                            if(error){
                                console.log('Fail to find message', error);
                            }else {
                                res.render('messageDetail', {
                                    "hasLogin": true,
                                    "sessionUser": user,
                                    "activeIndex": 0,
                                    "noReadNum": noReadNum,
                                    "moment": moment,
                                    "message": message,
                                    "blockNo": req.query.blockNo
                                });
                            }
                        })
                }
            });
    }else{
        res.redirect('/index');
    }
};