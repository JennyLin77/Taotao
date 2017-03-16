var User = require('../models/user');

var mongo = require('mongodb');
var gfs;
var Grid = require('gridfs-stream');
var db = new mongo.Db('taotaoPicture', new mongo.Server("127.0.0.1", 27017), {safe: false});

db.open(function (error) {
    if(error) {
        throw error;
    }
    gfs = Grid(db, mongo);
});

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
};

module.exports.doLogout = function (req, res) {
    req.session.user = null;
    res.redirect('/index');
};

module.exports.getImage = function (req, res) {
    var picId = new mongo.ObjectId(req.query.imageId);

    gfs.files.findOne({'_id': picId}, function (error, file) {
        if(error){
            return res.status(400).send(error);
        }
        if(!file){
            return res.status(404).send('The pic not found!');
        }

        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', 'attachment; filename=""');

        var readstream = gfs.createReadStream({
            _id: file._id
        });

        readstream.on("error", function (error) {
            console.log("Get error while processing stream " + error.message);
            res.end();
        });

        readstream.pipe(res);
    });
};