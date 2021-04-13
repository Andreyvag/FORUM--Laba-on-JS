const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const Shema = mongoose.Schema;

const UserShema = new Shema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        default: Date.now(),
        type: Date
    },
    role: {
        type: String,
        required: true
    }
});

UserShema.pre('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();

    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

const User = mongoose.model('User', UserShema);
module.exports = User;