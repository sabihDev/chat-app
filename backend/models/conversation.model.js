import { Schema, model } from 'mongoose';

const conversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    lastMessage: {
        type: Date,
        default: Date.now
    },
    isGroupChat: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Conversation = model('Conversation', conversationSchema);

export default Conversation;