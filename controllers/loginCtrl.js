var User = require('../models/user');

module.exports.doLogin = function (req, res) {
    console.log(req.body);
    console.log(req.body.username);
    User.findOne({userName: req.body.username}, function (error, user) {
        console.log("user: "+user);
        if(error) {
            console.log(error);
        }else if(user) {
            console.log(user);
            if (user.password == req.body.password) {
                req.session.user = user;
                res.json({
                    "success": true,
                    "message": "登录成功"
                });
            } else {
                res.json({
                    "success": false,
                    "message": "密码错误"
                });
            }
        }else {
            console.log(error);
            console.log("该用户不存在");
        }
    })
};