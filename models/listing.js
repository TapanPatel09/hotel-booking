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
    type: String,
    default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    set: (v) =>
        v === ""
            ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            : v,
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
    ]
});

listingSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await review.deleteMany({ _id: { $in: doc.review } });
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
