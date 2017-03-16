var User = require('../models/user');

var moment = require('moment');

module.exports.getAdminUser = function (req, res) {
    var _user = req.session.user;
    if(_user){
        User.find({"isAdmin": false})
            .sort({"created": -1})
            .exec(function (error, users) {
                if(error){
                    console.log('Fail to find users', error);
                }else{
                    res.render('adminUser', {
                        "hasLogin": true,
                        "sessionUser": _user,
                        "activeIndex": 0,
                        "moment": moment,
                        "users": users,
                        "isSearch": false
                    });
                }
            })
    }else{
        res.redirect('/index');
    }
};

module.exports.doShield = function (req, res) {
    var _user = req.session.user;
    if(_user){
        User.findById(req.body.userId)
            .exec(function (error, u) {
                if(error){
                    console.log('Fail to find user', error);
                    res.json({
                        "success": false,
                        "message": "查找用户失败"
                    });
                }else{
                    console.log(typeof req.body.isShield);
                    var isShield = true;
                    if(req.body.isShield == "false"){
                        isShield = false;
                    }
                    u.isShield = isShield;
                    u.save(function (error, user) {
                        if(error){
                            console.log('Fail to save user', error);
                            res.json({
                                "success": false,
                                "message": "保存用户失败"
                            });
                        }else{
                            console.log("After save user:", user);
                            res.json({
                                "success": true,
                                "userId": user._id,
                                "isShield": user.isShield
                            });
                        }
                    })
                }
            })
    }else{
        res.redirect('/index');
    }
};

module.exports.doSearch = function (req, res) {
    var _user = req.session.user;
    if(_user){
        var searchVal = req.query.searchVal;
        var rep = new RegExp(searchVal);
        console.log(rep);
        User.find({"isAdmin": false, "userName": rep})
            .sort({"created": -1})
            .exec(function (error, users) {
                if(error){
                    console.log('Fail to find users', error);
                }else{
                    res.render('adminUser', {
                        "hasLogin": true,
                        "sessionUser": _user,
                        "activeIndex": 0,
                        "moment": moment,
                        "users": users,
                        "isSearch": true
                    });
                }
            })
    }else{
        res.redirect('/index');
    }
}