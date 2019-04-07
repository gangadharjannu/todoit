const mongoose = require('mongoose');
const User = new mongoose.Schema(
    {
        name: { type: String, unique: true },
        password: { type: String, unique: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('user', User);
