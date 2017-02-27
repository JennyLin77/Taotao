var express = require('express');
var router = express.Router();
var registCtrl = require('../controllers/registCtrl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' }, activeIndex: 1 });
});

/**
 * regist block
 */
/* GET regist page */
router.get('/regist', function(req, res, next) {
    res.render('regist', { hasLogin: false });
});
/* POST checkUsername */
router.post('/regist/checkUsername', function (req, res, next) {
   registCtrl.checkUsername(req,res);
});


/* GET goodEdit page */
router.get('/goodEdit', function(req, res, next) {
    res.render('goodEdit', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' } });
});

/* GET goodDetail page */
router.get('/goodDetail', function(req, res, next) {
    res.render('goodDetail', { hasLogin: true, sessionUser: { _id: 122, userName: '七七ing' } });
});

module.exports = router;
