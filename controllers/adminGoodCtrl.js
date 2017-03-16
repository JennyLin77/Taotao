var Good = require('../models/good');

var moment = require('moment');

module.exports.getAdminGood = function (req, res) {
    var _user = req.session.user;
    if(_user){
        Good.find({"hasApprove": false})
            .sort({"meta.updateAt": 1})
            .populate('ownerId')
            .exec(function (error, goods) {
                if(error){
                    console.log('Fail to find goods', error);
                }else{
                    res.render('adminGood', {
                        "hasLogin": true,
                        "sessionUser": _user,
                        "activeIndex": 0,
                        "moment": moment,
                        "goods": goods,
                        "isSearch": false
                    });
                }
            })
    }else{
        res.redirect('/index');
    }
};

module.exports.doApprove = function (req, res) {
    var _user = req.session.user;
    if(_user){
        Good.findById(req.body.goodId)
            .exec(function (error, g) {
                if(error){
                    console.log('Fail to find good', error);
                    res.json({
                        "success": false,
                        "message": "查找商品失败"
                    });
                }else{
                    console.log(typeof req.body.isPass);
                    var isPass = true;
                    if(req.body.isPass == "false"){
                        isPass = false;
                    }
                    g.hasApprove = true;
                    g.approveStatus = isPass;
                    g.save(function (error, good) {
                        if(error){
                            console.log('Fail to save good', error);
                            res.json({
                                "success": false,
                                "message": "保存商品失败"
                            });
                        }else{
                            console.log("After save good:", good);
                            res.json({
                                "success": true,
                                "goodId": good._id
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
        Good.find({"goodName": rep})
            .sort({"meta.updateAt": -1})
            .populate('ownerId')
            .exec(function (error, goods) {
                if(error){
                    console.log('Fail to find goods', error);
                }else{
                    res.render('adminGood', {
                        "hasLogin": true,
                        "sessionUser": _user,
                        "activeIndex": 0,
                        "moment": moment,
                        "goods": goods,
                        "isSearch": true
                    });
                }
            })
    }else{
        res.redirect('/index');
    }
};