const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        // userId: { type: String, required: true, unique: true },
        isAdmin: { type: Boolean, default: false, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
