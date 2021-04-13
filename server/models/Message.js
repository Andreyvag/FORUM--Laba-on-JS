const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const MessageShema = new Shema({
    name: String,
    username: String,
    forumId: mongoose.ObjectId,
},  {
        timestamps: true
});


const Message = mongoose.model('Message', MessageShema);
module.exports = Message;