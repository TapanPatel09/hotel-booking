const mongoose = require("mongoose");
const review = require("./review.js");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url:String,
        filename: String
    },

    price: {
        type: Number
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    review:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review", 
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    category: {
    type: String,
        enum: [
        "Trending",
        "Room",
        "Iconic cities",
        "Castles",
        "Swimming Pools",
        "Camping",
        "Farms",
        "Arctic",
        "Domes",
        "Boats"
        ],    
        required: true
    }

});

listingSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await review.deleteMany({ _id: { $in: doc.review } });
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
