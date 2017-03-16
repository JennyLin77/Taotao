var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

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
        ref: 'User',
        require: true
    }
});

module.exports = CommentSchema;