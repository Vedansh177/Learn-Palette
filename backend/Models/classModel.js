const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    teacher: { type: Types.ObjectId, ref: 'teacher'},
    lecture: { type: Types.ObjectId, ref: 'lecture'},
    name: { type: String, required: true },
    description: String,
    tags: [],
    cover: String,
    icon: String,
    createdAt: {type : Date, default: Date.now},
});

module.exports = model('class', mySchema);