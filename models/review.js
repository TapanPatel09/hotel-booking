const { types } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating:{
        type: String,
        min: 1,
        max: 5
    },
    created:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Review",reviewSchema);