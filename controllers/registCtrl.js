var User = require('../models/user');

module.exports.doRegist = function (req, res) {
    console.log(req.body);
    User.findOne({userName: req.body.username}, function (error, person) {
        if(error) {
            console.log(error);
        }else if(person) {
            res.json({
                "success": false,
                "message": "该用户名已存在，请直接登录~"
            });
        }else {
            User.create({
                userName: req.body.username,
                password: req.body.password,
                address: req.body.address,
                longPhone: req.body.lPhone,
                shortPhone: req.body.sPhone,
                wechat: req.body.wechat,
                qq: req.body.qq
            }, function (error, user) {
                if(error) {
                    console.log(error);
                }else {
                    req.session.user = user;
                    res.json({
                        "success": true,
                        "message": "注册成功"
                    });
                }
            })
        }
    })
};
