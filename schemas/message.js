var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

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
        ref: 'User',
        require: true
    },
    receiverId: {		    // 消息接收方的_id
        type: ObjectId,
        ref: 'User',
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

module.exports = MessageSchema;