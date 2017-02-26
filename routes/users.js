var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET adminUser page */
router.get('/adminUser', function(req, res, next) {
    res.render('adminUser', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' } });
});

/* GET adminGood page */
router.get('/adminGood', function(req, res, next) {
    res.render('adminGood', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' } });
});


/* GET info page */
router.get('/info', function(req, res, next) {
    res.render('info', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' } });
});

/* GET commentGood page */
router.get('/commentGood', function(req, res, next) {
    res.render('commonGood', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' }, subTitle: '留言商品', isCollect: false });
});

/* GET collectGood page */
router.get('/collectGood', function(req, res, next) {
    res.render('commonGood', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' }, subTitle: '收藏商品', isCollect: true });
});

/* GET publishGood page */
router.get('/publishGood', function(req, res, next) {
    res.render('publishGood', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' } });
});

/* GET inbox page */
router.get('/inbox', function(req, res, next) {
    res.render('inbox', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' } });
});

/* GET sendbox page */
router.get('/sendbox', function(req, res, next) {
    res.render('sendbox', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' } });
});

/* GET messageDetail page */
router.get('/messageDetail', function(req, res, next) {
    res.render('messageDetail', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' }, activeIndex: "sendbox" });
});

module.exports = router;
