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
	myGoods: [{type: ObjectId, ref: 'good'}],                   // 记录用户发布过的商品的_id
	mySendMessages: [{type: ObjectId, ref: 'message'}],			// 记录用户发送过的消息的_id
	myReceiveMessages: [{type: ObjectId, ref: 'message'}],		// 记录用户接收过的消息的_id
	myCollections: [{type: ObjectId, ref: 'good'}],				// 记录用户收藏过的商品的_id
	myCommentGoods: [{type: ObjectId, ref: 'good'}],			// 记录用户留言过的商品的_id
	longPhone: {				 // 长号
		type: String,
		require: true
	},
	smallPhone: String,          // 短号
	wechat: String,				 // 微信号
	qq: String,					 // qq号
	address: String              // 当前住址
});


// define MessageSchema
var MessageSchema = new Schema({
	title: {				// 消息标题
		type: String,
		require: true
	},
	senderName: {			// 消息发送方名字
		type: String,
		require: true
	},
	receiverName: {		    // 消息接收方名字
		type: String,
		require: true
	},
	senderId: {				// 消息发送方的_id
		type: ObjectId,
		ref: 'user',
		require: true
	},
	receiverId: {		    // 消息接收方的_id
		type: ObjectId,
		ref: 'user',
		require: true
	},
	content: String,        // 消息内容
	isRead: {        		// 表示消息接收方是否已经阅读该消息
		type: Boolean,
		default: false
	},
	created: {				// 消息创建时间
		type: Date,
		default: Date.now()
	}
});


// define CommentSchema
var CommentSchema = new Schema({
	content: {					// 留言内容
		type: String,
		require: true
	},
	created: {					// 留言创建时间
		type: Date,
		default: Date.now()
	},
	subComment: [this],			// 留言的回复
	userId: {					// 留言用户的_id
		type: ObjectId,
		ref: 'user',
		require: true
	}
});


// define GoodSchema
var GoodSchema = new Schema({	 // 在显示商品时，会将商品发布者不为空的联系信息（包括长号、短号、qq、微信）都显示出来
    goodName: {					 // 商品名
        type: String,
        require: true
    },
    price: Number,				 // 商品价格
    detail: String,				 // 商品详情
    images: [{type: String}],	 // 商品图片
    degree: String,				 // 商品新旧程度
    tradeMode: String,			 // 商品交易方式
    tradeTime: String,           // 商品交易有效时间，用于判断与上次的修改是否一致
    startTime: {				 // 商品有效的开始时间
        type: Date,
        default: Date.now()
    },
    endTime: {					 // 商品有效的截止时间
        type: Date
    },
    paymentWay: String,			 // 付款方式
    ownerId: {					 // 发布者（物品拥有者）的_id
        type: ObjectId,							// 发布者的引用
        ref: 'user',							// 引用自user
        require: true
    },
    tradeStatus: {               // 交易状态，有"正常交易/交易成功/已下线"这3种值
        type: String,
        default: "正常交易"
    },
    collectNum: {				 // 记录该商品被收藏的次数
        type: Number,
        default: 0
    },
    comment: [CommentSchema],	 // 记录该商品的所有留言
    approveStatus: {			 // 审批状态，true为审批通过，false为审批不通过
        type: Boolean,
        default: false
    },
    hasApprove: {				 // 管理员有无审批过（对于新发布或新修改的商品都要审批），没审批过的设为false
        type: Boolean,
        default: false
    },
    meta: {
        createdAt: {			 // 商品的发布时间
            type: Date,
            default: Date.now()
        },
        updateAt: {				 // 商品的更新时间
            type: Date,
            default: Date.now()
        }
    }
});

GoodSchema.pre('save',function(next){                              //pre('save')意为每次保存前先调用这个回调方法
    if(this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now();
    }else {
        this.meta.updateAt = Date.now();
    }

    next();                                                       //在pre('save')中调用next，这样才会将存储流程走下去
});


mongoose.model('user', UserSchema);
mongoose.model('good', GoodSchema);
mongoose.model('message', MessageSchema);
mongoose.model('comment', CommentSchema);