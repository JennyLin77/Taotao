var Good = require('../models/good');

var moment = require('moment');
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

module.exports.getGoodModify = function (req, res) {
    var _user = req.session.user;
    if(_user){
        Good.findById(req.query.goodId)
            .exec(function (error, good) {
                if(error) {
                    console.log(error);
                }else {
                    res.render('goodModify', {
                        "hasLogin": true,
                        "sessionUser": _user,
                        "activeIndex": 0,
                        'moment': moment,
                        "good": good
                    });
                }
            })
    }else {
        res.redirect('/index');
    }
};

module.exports.checkGoodModify = function (req, res) {
    console.log(77)
    var busboy = new Busboy({headers: req.headers});
    var fileIdArr = [];
    var body = {};

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        fileIdArr.push(new mongo.ObjectId());
        console.log('Get file', fieldname, filename);
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
        console.log("success to upload~");
        console.log("-------------body:");
        console.log(util.inspect(body, {showHidden: false, depth: null}));

        var good = new Object();
        good.goodName = body.goodName;
        good.price = body.price;
        good.detail = body.detail;
        console.log(fileIdArr);
        if(fileIdArr.length != 0){
            good.images = [];
            good.images.push.apply(good.images, fileIdArr);
        }
        good.degree = body.degree;
        good.tradeMode = body.tradeMode;
        //good.tradeTime = body.tradeTime;
        good.paymentWay = body.paymentWay;
        good.tradeStatus = body.tradeStatus;
        good.hasApprove = false;
        good.approveStatus = false;

        console.log(good);

        Good.findById(body.goodId)
            .exec(function (error, _good) {
                if(error){
                    console.log(error);
                }else {
                    if(_good.tradeTime != body.tradeTime){
                        good.tradeTime = body.tradeTime;

                        var dateObj = _good.startTime;
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
                    }
                    console.log("good:");
                    console.log(good);

                    var g = _.extend(_good, good);
                    g.save(function (error, good) {
                        console.log(good);
                        if(error){
                            console.log(error);
                        }else {
                            res.json({
                                "success": true,
                                "goodId": good._id
                            });
                        }
                    })
                }
            })
    });
    req.pipe(busboy);
}