const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const ForumShema = new Shema({
    name: String,
    categoryId: mongoose.ObjectId,
},  {
        timestamps: true
});


const Forum = mongoose.model('Forum', ForumShema);
module.exports = Forum;