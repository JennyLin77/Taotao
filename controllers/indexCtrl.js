var Good = require('../models/good');

var moment = require('moment');

module.exports.getIndex = function (req, res) {
    var today = new Date();
    Good.find({'hasApprove': true, 'approveStatus': true, 'tradeStatus': "正常交易", 'startTime': {$lte: today}, 'endTime': {$gte: today}})
        .sort({'meta.createdAt': -1})
        .populate('ownerId')
        .exec(function (error, goods) {
            if(error){
                console.log('Fail to find goods', error);
            }else{
                console.log('goods.length: ', goods.length);
                var tempArr = [];
                goods.forEach(function(item, index, arr){
                    if(item.ownerId.isShield == false){
                        tempArr.push(item);
                    }
                });
                if(tempArr.length > 10){
                    goods = tempArr.slice(0, 10);
                }else{
                    goods = tempArr.slice(0, tempArr.length);
                }
                console.log('goods.length: ', goods.length);

                var goodArr = goods.slice(0, 5);
                res.render('index', {
                    "hasLogin": true,
                    "sessionUser": req.session.user,
                    "activeIndex": 1,
                    "isSearch": false,
                    "moment": moment,
                    "goods": goods,
                    "goodArr": goodArr
                });
            }
        })
};


module.exports.getHotGood = function (req, res) {
    var today = new Date();
    Good.find({'hasApprove': true, 'approveStatus': true, 'tradeStatus': "正常交易", 'startTime': {$lte: today}, 'endTime': {$gte: today}})
        .sort({'collectNum': -1, 'meta.createdAt': -1})
        .populate('ownerId')
        .exec(function (error, goods) {
            if(error){
                console.log('Fail to find goods', error);
            }else{
                console.log('goods.length: ', goods.length);

                var tempArr = [];
                goods.forEach(function(item, index, arr){
                    if(item.ownerId.isShield == false){
                        tempArr.push(item);
                    }
                });
                if(tempArr.length > 10){
                    goods = tempArr.slice(0, 10);
                }else{
                    goods = tempArr.slice(0, tempArr.length);
                }
                console.log('goods.length: ', goods.length);

                var goodArr = goods.slice(0, 5);
                res.render('index', {
                    "hasLogin": true,
                    "sessionUser": req.session.user,
                    "activeIndex": 2,
                    "isSearch": false,
                    "moment": moment,
                    "goods": goods,
                    "goodArr": goodArr
                });
            }
        })
};

module.exports.getAllGood = function (req, res) {
    var today = new Date();
    Good.find({'hasApprove': true, 'approveStatus': true, 'tradeStatus': "正常交易", 'startTime': {$lte: today}, 'endTime': {$gte: today}})
        .sort({'meta.createdAt': -1})
        .populate('ownerId')
        .exec(function (error, goods) {
            if(error){
                console.log('Fail to find goods', error);
            }else{
                console.log('goods.length: ', goods.length);

                var tempArr = [];
                goods.forEach(function(item, index, arr){
                    if(item.ownerId.isShield == false){
                        tempArr.push(item);
                    }
                });
                goods = tempArr.slice(0, tempArr.length);
                console.log('goods.length: ', goods.length);

                var goodArr = goods.slice(0, 5);
                res.render('index', {
                    "hasLogin": true,
                    "sessionUser": req.session.user,
                    "activeIndex": 3,
                    "isSearch": false,
                    "moment": moment,
                    "goods": goods,
                    "goodArr": goodArr
                });
            }
        })
};

module.exports.doSearch = function (req, res) {
    var today = new Date();
    Good.find({'hasApprove': true, 'approveStatus': true, 'tradeStatus': "正常交易", 'startTime': {$lte: today}, 'endTime': {$gte: today}})
        .sort({'meta.createdAt': -1})
        .populate('ownerId')
        .exec(function (error, goodArr) {
            if(error){
                console.log('Fail to find goodArr', error);
            }else{
                console.log('goodArr.length: ', goodArr.length);
                var tempArr = [];
                goodArr.forEach(function(item, index, arr){
                    if(item.ownerId.isShield == false){
                        tempArr.push(item);
                    }
                });
                goodArr = tempArr.slice(0, 5);
                console.log('goodArr.length: ', goodArr.length);


                var searchVal = req.query.searchVal;
                var rep = new RegExp(searchVal);
                console.log(rep);
                Good.find({'hasApprove': true, 'approveStatus': true, 'tradeStatus': "正常交易", 'startTime': {$lte: today}, 'endTime': {$gte: today}, "goodName": rep})
                    .sort({'meta.createdAt': -1})
                    .populate('ownerId')
                    .exec(function (error, goods) {
                        if(error){
                            console.log('Fail to find goods', error);
                        }else{
                            console.log('goods.length: ', goods.length);

                            var tempArr = [];
                            goods.forEach(function(item, index, arr){
                                if(item.ownerId.isShield == false){
                                    tempArr.push(item);
                                }
                            });
                            goods = tempArr.slice(0, tempArr.length);
                            console.log('goods.length: ', goods.length);

                            res.render('index', {
                                "hasLogin": true,
                                "sessionUser": req.session.user,
                                "activeIndex": 3,
                                "isSearch": true,
                                "moment": moment,
                                "goods": goods,
                                "goodArr": goodArr
                            });
                        }
                    })
            }
        })
};
