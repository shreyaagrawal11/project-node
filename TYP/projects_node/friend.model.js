const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const friendSchema = new Schema({
    BookName: {
        type: String,
        unique: true,
    },
    Price: {
        type: Number,
    },
    Author: {
        type: String,
    },
    Language: {
        type: String,
    },
    AboutAuthor: {
        type: String,
    },

});
//we have to perform CRUD Operation
const FriendModel = mongoose.model("FriendModel", friendSchema);
module.exports = { FriendModel };