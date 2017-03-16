var express = require('express');
var router = express.Router();
var registCtrl = require('../controllers/registCtrl');
var commonCtrl = require('../controllers/commonCtrl');
var indexCtrl = require('../controllers/indexCtrl');
var loginCtrl = require('../controllers/loginCtrl');
var goodEditCtrl = require('../controllers/goodEditCtrl');
var goodModifyCtrl = require('../controllers/goodModifyCtrl');
var goodDetailCtrl = require('../controllers/goodDetailCtrl');

/* GET home page */
router.get('/', function (req, res, next) {
    res.redirect('/index');
});
/* GET index page */
router.get('/index', function (req, res, next) {
    indexCtrl.getIndex(req, res);
});
/* GET hotGood page */
router.get('/hotGood', function (req, res, next) {
    indexCtrl.getHotGood(req, res);
});
/* GET allGood page */
router.get('/allGood', function (req, res, next) {
    indexCtrl.getAllGood(req, res);
});
/* Deal allGood's doSearch */
router.get('/allGood/doSearch', function (req, res, next) {
    indexCtrl.doSearch(req, res);
});


/**
 * regist block
 */
/* GET regist page */
router.get('/regist', function(req, res, next) {
    res.render('regist', { hasLogin: false });
});
/* POST regist's checkUsername */
router.post('/regist/checkUsername', function (req, res, next) {
    commonCtrl.checkUsername(req, res);
});
/* POST doRegist */
router.post('/regist/doRegist', function (req, res, next) {
    registCtrl.doRegist(req, res);
});

/* POST login's checkUsername */
router.post('/login/checkUsername', function (req, res, next) {
    commonCtrl.checkUsername(req, res);
});

/* POST login's checkPassword */
router.post('/login/doLogin', function (req, res, next) {
    loginCtrl.doLogin(req, res);
});

/* GET logout */
router.get('/logout', function (req, res, next) {
    commonCtrl.doLogout(req, res);
});

/* GET goodEdit page */
router.get('/goodEdit', function(req, res, next) {
    goodEditCtrl.getGoodEdit(req, res);
});

/* POST goodEdit's checkGoodEdit */
router.post('/checkGoodEdit', function(req, res, next) {
    goodEditCtrl.checkGoodEdit(req, res);
});

/* GET goodModify page */
router.get('/goodModify', function(req, res, next) {
    goodModifyCtrl.getGoodModify(req, res);
});

/* POST goodModify's checkGoodModify */
router.post('/checkGoodModify', function(req, res, next) {
    goodModifyCtrl.checkGoodModify(req, res);
});

/* GET goodDetail page */
router.get('/goodDetail', function(req, res, next) {
    goodDetailCtrl.getGoodDetail(req, res);
});

/* POST goodDetail's doCollect */
router.post('/goodDetail/doCollect', function(req, res, next) {
    goodDetailCtrl.doCollect(req, res);
});

/* POST goodDetail's doComment */
router.post('/goodDetail/doComment', function(req, res, next) {
    goodDetailCtrl.doComment(req, res);
});

/* POST goodDetail's doReply */
router.post('/goodDetail/doReply', function(req, res, next) {
    goodDetailCtrl.doReply(req, res);
});


/* load pic */
router.get('/image', function (req, res) {
    commonCtrl.getImage(req, res);
});

module.exports = router;
