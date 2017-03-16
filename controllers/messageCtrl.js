var Message = require('../models/message');
var User = require('../models/user');

module.exports.doSend = function (req, res) {
    var _user = req.session.user;
    if(_user){
        var _message = new Message;
        _message.title = req.body.msgTitle;
        _message.senderName = req.body.senderName;
        _message.receiverName = req.body.receiverName;
        _message.senderId = req.body.senderId ;
        _message.receiverId = req.body.receiverId ;
        _message.content = req.body.content ;
        _message.save(function (error, message) {
            if(error){
                console.log('Fail to save message', error);
                res.json({
                    "success": false,
                    "message": '保存消息失败'
                });
            }else{
                console.log('After save message', message);
                User.findById(req.body.senderId)
                    .exec(function (error, sender) {
                        if(error){
                            console.log('Fail to find sender', error);
                            res.json({
                                "success": false,
                                "message": '查找发送者失败'
                            });
                        }else{
                            sender.mySendMessages.push(message._id);
                            sender.save(function (error, _sender) {
                                if(error){
                                    console.log('Fail to save sender', error);
                                    res.json({
                                        "success": false,
                                        "message": '保存发送者失败'
                                    });
                                }else{
                                    console.log('After save sender', _sender);
                                    User.findById(req.body.receiverId)
                                        .exec(function (error, receiver) {
                                            if(error){
                                                console.log('Fail to find receiver', error);
                                                res.json({
                                                    "success": false,
                                                    "message": '查找接收者失败'
                                                });
                                            }else{
                                                receiver.myReceiveMessages.push(message._id);
                                                receiver.save(function (error, _receiver) {
                                                    if(error){
                                                        console.log('Fail to save receiver', error);
                                                        res.json({
                                                            "success": false,
                                                            "message": '保存接收者失败'
                                                        });
                                                    }else{
                                                        console.log('After save receiver', _receiver);
                                                        res.json({
                                                            "success": true,
                                                            "message": '消息发送成功'
                                                        });
                                                    }
                                                })
                                            }
                                        })
                                }
                            })
                        }
                    })
            }
        })
    }else {
        res.redirect('/index');
    }
}