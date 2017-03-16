var Good = require('../models/good');
var User = require('../models/user');
var Comment = require('../models/comment');
var moment = require('moment');

module.exports.getGoodDetail = function (req, res) {
    var _user = req.session.user;
    if(_user){
        Good.findById(req.query.goodId)
            .populate('ownerId')
            .populate('comment.userId')
            .exec(function (error, good) {
                if(error){
                    console.log('-------Find good error', error);
                }else {
                    User.findById(_user._id)
                        .exec(function (error, u) {
                            if(error){
                                console.log('-------Find user error', error);
                            }else {
                                var isSelf = false;
                                var isCollect = false;
                                console.log('good.ownerId: ', good.ownerId);
                                if(_user._id.toString() == good.ownerId._id.toString()){
                                    isSelf = true;
                                }

                                for(var i=0, len=u.myCollections.length; i<len; i++){
                                    if(u.myCollections[i].toString() == good._id.toString()){
                                        isCollect = true;
                                        break;
                                    }
                                }

                                if(good.comment.length == 0){
                                    res.render('goodDetail', {
                                        "hasLogin": true,
                                        "sessionUser": _user,
                                        "activeIndex": 0,
                                        "moment": moment,
                                        "isSelf": isSelf,
                                        "isCollect": isCollect,
                                        "good": good
                                    });
                                }else{
                                    var subCommentArr = [];
                                    for(var x=0, xLen=good.comment.length; x<xLen; x++){
                                        if(good.comment[x].subComment.length != 0){
                                            for(var y=0, yLen=good.comment[x].subComment.length; y<yLen; y++){
                                                subCommentArr.push({
                                                    x: x,
                                                    y: y
                                                });
                                            }
                                        }
                                    }
                                    console.log(subCommentArr);
                                    if(subCommentArr.length == 0){
                                        res.render('goodDetail', {
                                            "hasLogin": true,
                                            "sessionUser": _user,
                                            "activeIndex": 0,
                                            "moment": moment,
                                            "isSelf": isSelf,
                                            "isCollect": isCollect,
                                            "good": good
                                        });
                                    }else{
                                        dealSubComment(res, _user, isSelf, isCollect, good, subCommentArr, subCommentArr.length-1);
                                    }
                                }
                            }
                        })
                }
            })
    }else {
        res.redirect('/index');
    }
};

function dealSubComment(res, _user, isSelf, isCollect, good, subCommentArr, index) {
    var x = subCommentArr[index].x;
    var y = subCommentArr[index].y;
    console.log("x=" + x);
    console.log("y=" + y);
    User.findById(good.comment[x].subComment[y].userId)
        .exec(function (error, u) {
            if(error){
                console.log("Fail to find subComment' user", error);
            }else {
                console.log("subComment" + x + "-" + y + " user:", u);
                good.comment[x].subComment[y].userId = u;
                if(index == 0){
                    console.log(good);
                    res.render('goodDetail', {
                        "hasLogin": true,
                        "sessionUser": _user,
                        "activeIndex": 0,
                        "moment": moment,
                        "isSelf": isSelf,
                        "isCollect": isCollect,
                        "good": good
                    });
                }else{
                    dealSubComment(res, _user, isSelf, isCollect, good, subCommentArr, index-1);
                }
            }
        })
}

module.exports.doCollect = function (req, res) {
    var _user = req.session.user;
    if(_user){
        console.log("-----req.body:", req.body);
        if(req.body.isCollect == 'true'){
            Good.findById(req.body.goodId)
                .exec(function (error, good) {
                    if(error){
                        console.log('Good not found', error);
                    }else{
                        good.collectNum++;
                        good.save(function (error, _good) {
                            if(error){
                                console.log('Fail to save good', error);
                            }else{
                                console.log('After save good:', _good);
                                User.findById(_user._id)
                                    .exec(function (error, user) {
                                        if(error){
                                            console.log('User not found', error);
                                        }else{
                                            user.myCollections.push(_good._id);
                                            user.save(function (error, u) {
                                                if(error){
                                                    console.log('Fail to save user', error);
                                                }else {
                                                    console.log('After save user:', u);
                                                    res.json({
                                                        "success": true,
                                                        "isCollect": true,
                                                        "collectNum": _good.collectNum
                                                    });
                                                }
                                            })
                                        }
                                    })
                            }
                        })
                    }
                })
        }else{
            Good.findById(req.body.goodId)
                .exec(function (error, good) {
                    if(error){
                        console.log('Good not found', error);
                    }else{
                        good.collectNum--;
                        good.save(function (error, _good) {
                            if(error){
                                console.log('Fail to save good', error);
                            }else{
                                console.log('After save good:', _good);
                                User.findById(_user._id)
                                    .exec(function (error, user) {
                                        if(error){
                                            console.log('User not found', error);
                                        }else{
                                            for(var i=0, len=user.myCollections.length; i<len; i++){
                                                if(user.myCollections[i].toString() == _good._id.toString()){
                                                    user.myCollections.splice(i, 1);
                                                    break;
                                                }
                                            }
                                            user.save(function (error, u) {
                                                if(error){
                                                    console.log('Fail to save user', error);
                                                }else {
                                                    console.log('After save user:', u);
                                                    res.json({
                                                        "success": true,
                                                        "isCollect": false,
                                                        "collectNum": _good.collectNum
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
    }else{
        res.redirect('/index');
    }
};

module.exports.doComment= function (req, res) {
    var _user = req.session.user;
    if(_user){
        Comment.create({
            content: req.body.content,
            userId: _user._id
        }, function (error, comment) {
            if(error){
                console.log('Fail to create comment', error);
            }else {
                Good.findById(req.body.goodId)
                    .exec(function (error, _good) {
                        if(error){
                            console.log('Fail to find good', error);
                        }else{
                            _good.comment.push(comment);
                            _good.save(function (error, good) {
                                if(error){
                                    console.log('Fail to save good', error);
                                }else{
                                    User.findById(_user._id)
                                        .exec(function (error, u) {
                                            if(error){
                                                console.log('Fail to find user', error);
                                            }else{
                                                var isPush = true;
                                                for(var i=0,len=u.myCommentGoods.length; i<len; i++){
                                                    if(u.myCommentGoods[i].toString() == good._id.toString()){
                                                        isPush = false;
                                                        break;
                                                    }
                                                }
                                                if(isPush == true){
                                                    u.myCommentGoods.push(good._id);
                                                    u.save(function (error, user) {
                                                        if(error){
                                                            console.log('Fail to save user', error);
                                                        }else{
                                                            res.json({
                                                                "success": true,
                                                                "comment": comment,
                                                                "user": user,
                                                                "commentNum": _good.comment.length
                                                            });
                                                        }
                                                    })
                                                }else{
                                                    res.json({
                                                        "success": true,
                                                        "comment": comment,
                                                        "user": u,
                                                        "commentNum": _good.comment.length
                                                    });
                                                }
                                            }
                                        })
                                }
                            })
                        }
                    })
            }
        })
    }else{
        res.redirect('/index');
    }
};

module.exports.doReply= function (req, res) {
    var _user = req.session.user;
    if(_user){
        Good.findById(req.body.goodId)
            .populate('comment')
            .exec(function (error, _good) {
                if(error){
                    console.log('Fail to find good', error);
                }else {
                    var subComment = new Comment;
                    subComment.content = req.body.content;
                    subComment.userId = _user._id;

                    subComment.save(function (error, subComment) {
                        if(error){
                            console.log('Fail to save subComment', error);
                        }else {
                            Comment.findById(req.body.commentId)
                                .exec(function (error, _comment) {
                                    if(error){
                                        console.log('Fail to find comment', error);
                                    }else {
                                        _comment.subComment.push(subComment);
                                        _comment.save(function (error, comment) {
                                            for(var i=0, len=_good.comment.length; i<len; i++){
                                                if(_good.comment[i]._id.toString() == comment._id.toString()){
                                                    break;
                                                }
                                            }

                                            _good.comment.splice(i, 1, comment);
                                            _good.save(function (error, good) {
                                                if(error){
                                                    console.log('Fail to save good', error);
                                                }else{
                                                    console.log('After save good', good);
                                                    User.findById(_user._id)
                                                        .exec(function (error, u) {
                                                            if(error){
                                                                console.log('Fail to find user', error);
                                                            }else{
                                                                var isPush = true;
                                                                for(var i=0, len=u.myCommentGoods.length; i<len; i++){
                                                                    if(u.myCommentGoods[i].toString() == good._id.toString()){
                                                                        isPush = false;
                                                                        break;
                                                                    }
                                                                }
                                                                if(isPush == true){
                                                                    u.myCommentGoods.push(good._id);
                                                                    u.save(function (error, user) {
                                                                        if(error){
                                                                            console.log('Fail to save user', error);
                                                                        }else{
                                                                            console.log('After save user', user);
                                                                            res.json({
                                                                                "success": true,
                                                                                "subComment": subComment,
                                                                                "user": user
                                                                            });
                                                                        }
                                                                    })
                                                                }else{
                                                                    console.log('After save user', u);
                                                                    res.json({
                                                                        "success": true,
                                                                        "subComment": subComment,
                                                                        "user": u
                                                                    });
                                                                }
                                                            }
                                                        })
                                                }
                                            })
                                        })
                                    }
                                })
                        }
                    })

                }
            })
    }else{
        res.redirect('/index');
    }
};


