var express = require('express');
var router = express.Router();
var infoCtrl = require('../controllers/infoCtrl');
var messageCtrl = require('../controllers/messageCtrl');
var inboxCtrl = require('../controllers/inboxCtrl');
var sendboxCtrl = require('../controllers/sendboxCtrl');
var mailboxCtrl = require('../controllers/mailboxCtrl');
var adminUserCtrl = require('../controllers/adminUserCtrl');
var adminGoodCtrl = require('../controllers/adminGoodCtrl');
var commonGoodCtrl = require('../controllers/commonGoodCtrl');
var publishGoodCtrl = require('../controllers/publishGoodCtrl');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/user/info');
});

/* GET adminUser page */
router.get('/adminUser', function(req, res, next) {
    adminUserCtrl.getAdminUser(req, res);
});

/* POST adminUser's doShield */
router.post('/adminUser/doShield', function(req, res, next) {
    adminUserCtrl.doShield(req, res);
});

/* GET adminUser's doSearch */
router.get('/adminUser/doSearch', function(req, res, next) {
    adminUserCtrl.doSearch(req, res);
});

/* GET adminGood page */
router.get('/adminGood', function(req, res, next) {
    adminGoodCtrl.getAdminGood(req, res);
});

/* POST adminGood's doApprove */
router.post('/adminGood/doApprove', function(req, res, next) {
    adminGoodCtrl.doApprove(req, res);
});

/* GET adminGood's doSearch */
router.get('/adminGood/doSearch', function(req, res, next) {
    adminGoodCtrl.doSearch(req, res);
});


/* GET info page */
router.get('/info', function(req, res, next) {
    infoCtrl.getInfoPage(req, res);
});

/* POST verify info */
router.post('/checkInfo', function(req, res, next) {
    infoCtrl.checkInfo(req, res);
});

/* POST verify password */
router.post('/checkPwd', function(req, res, next) {
    infoCtrl.checkPwd(req, res);
});


/* GET commentGood page */
router.get('/commentGood', function(req, res, next) {
    commonGoodCtrl.getCommentGood(req, res);
});

/* GET collectGood page */
router.get('/collectGood', function(req, res, next) {
    commonGoodCtrl.getCollectGood(req, res);
});

/* GET publishGood page */
router.get('/publishGood', function(req, res, next) {
    publishGoodCtrl.getPublishGood(req, res);
});

/* GET inbox page */
router.get('/inbox', function(req, res, next) {
    inboxCtrl.getInbox(req, res);
});

/* Deal inbox's doRead */
router.get('/inbox/doRead', function(req, res, next) {
    inboxCtrl.doRead(req, res);
});

/* GET sendbox page */
router.get('/sendbox', function(req, res, next) {
    sendboxCtrl.getSendbox(req, res);
});

/* POST mailbox's doDelete */
router.post('/mailbox/doDelete', function(req, res, next) {
    mailboxCtrl.doDelete(req, res);
});

/* POST mailbox's doMessageDetail */
router.post('/mailbox/doMessageDetail', function(req, res, next) {
    mailboxCtrl.doMessageDetail(req, res);
});

/* GET mailbox's messageDetail page */
router.get('/mailbox/messageDetail', function(req, res, next) {
    mailboxCtrl.getMessageDetail(req, res);
});

/* Deal mailbox's doDeleteOne */
router.get('/mailbox/doDeleteOne', function(req, res, next) {
    mailboxCtrl.doDeleteOne(req, res);
});


/* POST message's doSend */
router.post('/message/doSend', function(req, res, next) {
    messageCtrl.doSend(req, res);
});



module.exports = router;
