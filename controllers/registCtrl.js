var mongoose  = require('mongoose');
require('../models/model');
var User = mongoose.model('user');

module.exports.checkUsername = function (req, res) {
    console.log(req.body);
    console.log(req.body.username);
    User.findOne({userName: req.body.username}, function (error, user) {
        console.log("user: "+user);
        if(error) {
            console.log(error);
        }else if(user) {
            res.json({
                "isExit": true,
                "message": "用户名已被注册，请换一个试试吧"
            });
        }else {
            res.json({
               "isExit": false,
                "message": "该用户名可用"
            });
        }
    })
}
