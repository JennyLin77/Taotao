var Good = require('../models/good');
var User = require('../models/user');

var Busboy = require('busboy');
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

module.exports.getGoodEdit = function (req, res) {
    var _user = req.session.user;
    if(_user){
        res.render('goodEdit', {
            "hasLogin": true,
            "sessionUser": _user,
            "activeIndex": 0
        });
    }else {
        res.redirect('/index');
    }
};

module.exports.checkGoodEdit = function (req, res) {
    console.log(77)
    var busboy = new Busboy({headers: req.headers});
    var fileIdArr = [];
    var body = {};
    
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        fileIdArr.push(new mongo.ObjectId());
        console.log('get file', fieldname, filename);
        var writeStream = gfs.createWriteStream({
            _id: fileIdArr[fileIdArr.length-1],
            filename: filename,
            mode: 'w',
            content_type: mimetype
        });
        file.pipe(writeStream);
    }).on('field', function (key, value) {
        body[key] = value;
    }).on('finish', function () {
        var good = new Good;
        good.goodName = body.goodName;
        good.price = body.price;
        good.detail = body.detail;
        good.images.push.apply(good.images, fileIdArr);
        good.degree = body.degree;
        good.tradeMode = body.tradeMode;
        good.tradeTime = body.tradeTime;
        good.paymentWay = body.paymentWay;
        good.ownerId = req.session.user._id;

        var dateObj = new Date();
        console.log(typeof body.tradeTime);
        switch(body.tradeTime)
        {
            case '1':
                dateObj.setDate(dateObj.getDate()+2);
                break;
            case '2':
                dateObj.setDate(dateObj.getDate()+6);
                break;
            case '3':
                dateObj.setMonth(dateObj.getMonth()+1);
                break;
            case '4':
                dateObj.setMonth(dateObj.getMonth()+3);
                break;
            case '5':
                dateObj.setFullYear(dateObj.getFullYear()+1);
                break;
        }
        good.endTime = dateObj;

        console.log(good);

        good.save(function (error, _good) {
            if(error){
                console.log(error);
            }else {
                User.findById(good.ownerId)
                    .exec(function (error, user) {
                        user.myGoods.push(good._id);
                        user.save(function (error, u) {
                            console.log("user: ");
                            console.log(u);
                            if(error){
                                console.log(error);
                            }else {
                                res.json({
                                    "success": true,
                                    "goodId": good._id
                                });
                            }
                        })
                    })
            }
        })
    });
    req.pipe(busboy);
}