var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// define UserSchema
var UserSchema = new Schema({
    userName: {                  // 用户名
        type: String,
        unique: true,        // 用户名唯一
        require: true       // 用户名非空
    },
    portraitUrl: String,         // 用户头像
    password: {					 // 密码
        type: String,
        require: true
    },
    created: {					 // 创建时间
        type: Date,
        default: Date.now()
    },
    isAdmin: {					 // 是否为管理员
        type: Boolean,
        default: false
    },
    isShield: {					 // 是否被屏蔽（被屏蔽的用户处于禁止状态，该用户发布的商品均不可见）
        type: Boolean,
        default: false
    },
    myGoods: [{type: ObjectId, ref: 'Good'}],                   // 记录用户发布过的商品的_id
    mySendMessages: [{type: ObjectId, ref: 'Message'}],			// 记录用户发送过的消息的_id
    myReceiveMessages: [{type: ObjectId, ref: 'Message'}],		// 记录用户接收过的消息的_id
    myCollections: [{type: ObjectId, ref: 'Good'}],				// 记录用户收藏过的商品的_id
    myCommentGoods: [{type: ObjectId, ref: 'Good'}],			// 记录用户留言过的商品的_id
    longPhone: {				 // 长号
        type: String,
        require: true
    },
    shortPhone: String,          // 短号
    wechat: String,				 // 微信号
    qq: String,					 // qq号
    address: String              // 当前住址
});

module.exports = UserSchema;
