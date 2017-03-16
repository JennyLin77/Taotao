var User = require('../models/user');

var moment = require('moment');

module.exports.getSendbox = function (req, res) {
    var _user = req.session.user;
    if(_user){
        User.findById(_user._id)
            .populate('myReceiveMessages')
            .populate('mySendMessages')
            .exec(function (error, user) {
                if(error) {
                    console.log(error);
                }else{
                    if (user.myReceiveMessages.length == 0) {
                        res.render('sendbox', {
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
                        res.render('sendbox', {
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