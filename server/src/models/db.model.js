'use strict';

const mongoose = require('mongoose');

const envConfig = require('../../config/env');

const user = require('./user.model');

module.exports = function () {
    mongoose.connect(envConfig.get('MONGODB_URI'));
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('users db opened');
    });
};
