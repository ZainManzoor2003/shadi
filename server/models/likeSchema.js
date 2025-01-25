const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    likeId: String,
    likeBackId: String,
    like: Boolean, // userId
    likeBack: Boolean, //user Id


})

const Like = new mongoose.model('Like', likeSchema);

module.exports = Like;