const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true  // corrected "require" to "required"
    }
});

// Apply passport-local-mongoose plugin to the schema
userSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model('User', userSchema);
