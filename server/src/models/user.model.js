'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    grade: {
        type: Number,
        index: true,
        required: true
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        index: true,
        required: true
    },
    joinedDate: {
        type: Date,
        index: true,
        required: true
    },
    address: {
        place: {
            type: String,
            required: true
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        zip: {
            type: Number
        }
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
