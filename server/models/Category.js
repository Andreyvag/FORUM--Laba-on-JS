const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const CategoryShema = new Shema({
    name: String 
},  {
        timestamps: true
});


const Category = mongoose.model('Category', CategoryShema);
module.exports = Category;