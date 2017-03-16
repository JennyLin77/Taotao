var User = require('../models/user');
var Message = require('../models/message');

var Busboy = require('busboy');
var _ = require('underscore');
var mongo = require('mongodb');
var util = require('util');
var gfs;
var Grid = require('gridfs-stream');
var db = new mongo.Db('taotaoPicture', new mongo.Server("127.0.0.1", 27017), {safe: false});

db.open(function (error) {
    if(error) {
        throw error;
    }
    gfs = Grid(db, mongo);
});


module.exports.getInfoPage = function (req, res) {
    console.log("getInfo: ");
    console.log(req.session.user);
    var sessionUser = req.session.user;
    if(sessionUser) {
        User.findById(sessionUser._id)
            .populate('myReceiveMessages')
            .exec(function (error, user) {
                if(error) {
                    console.log(error);
                }
                if (user.myReceiveMessages.length == 0) {
                    res.render('info', {
                        "hasLogin": true,
                        "sessionUser": user,
                        "activeIndex": 0,
                        "mailNum": 0
                    });
                } else {
                    var mailNum = 0;
                    for(var i=0, len=user.myReceiveMessages.length; i<len; i++){
                        if(user.myReceiveMessages[i].isRead == false){
                            mailNum++;
                        }
                    }
                    console.log("mailNum: ", mailNum);
                    res.render('info', {
                        "hasLogin": true,
                        "sessionUser": user,
                        "activeIndex": 0,
                        "mailNum": mailNum
                    });
                }
            });
    }else {
        res.redirect('/index');
    }
};

module.exports.checkInfo = function (req, res) {
    var busboy = new Busboy({headers: req.headers});
    var fileId = new mongo.ObjectId();
    var body = {};

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log('Get file', fieldname, filename);
        var writeStream = gfs.createWriteStream({
            _id: fileId,
            filename: filename,
            mode: 'w',
            content_type: mimetype
        });
        file.pipe(writeStream);
    }).on('field', function (key, value) {
        body[key] = value;
    }).on('finish', function () {
        console.log("success to upload~");
        console.log("-------------body:");
        console.log(util.inspect(body, {showHidden: false, depth: null}));

        var person = new Object();
        person.portraitUrl = fileId;
        person.address = body.addr;
        person.longPhone = body.longPhone;
        person.shortPhone = body.shortPhone;
        person.wechat = body.wechat;
        person.qq = body.qq;
        person._id = req.session.user._id;

        User.findOne({_id: person._id}, function (error, user) {
            if(error) {
                console.log(error);
            }
            var _user = _.extend(user, person);
            _user.save(function (error, user) {
                console.log("after save, user:");
                console.log(user);
                if(error) {
                    console.log(error);
                }else {
                    // res.redirect('/user?userId=' + user._id);
                    req.session.user = user;
                    res.json({
                        "success": true,
                        "userId": user._id
                    });
                }
            })
        })
    });

    req.pipe(busboy);
};

module.exports.checkPwd = function (req, res) {
    console.log(req.body);
    var _user = req.session.user;
    if(_user){
        User.findOne({_id: _user._id}, function (error, user) {
            if(error){
                console.log(error);
            }else {
                if(req.body.oldPwd == user.password) {
                    user.password = req.body.newPwd;
                    user.save(function (error, _u) {
                        if(error) {
                            console.log(error);
                        }else {
                            console.log(_u);
                            res.json({
                                "success": true,
                                "message": "修改密码成功"
                            });
                        }
                    })
                }else {
                    res.json({
                        "success": false,
                        "message": "原密码不正确"
                    });
                }
            }
        })
    }else {
        res.redirect('/index');
    }
}