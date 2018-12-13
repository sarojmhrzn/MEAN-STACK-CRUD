'use strict';

const Promise = require('bluebird');

const UserService = require('../../services/user.service');

function createUser(req, res, next) {
    UserService.create(req.body)
        .then(userCreated => {
            res.send({
                message: 'User Created Successfully!',
                data: userCreated,
                success: true
            })
        })
        .catch(err => {
            next(err);
        })
}

function listUsers(req, res, next) {
    let query = req.query;
    UserService.findAll(query)
        .then(listUsers => {
            return UserService.countAll()
                .then(count => {
                    const users = [];
                      return Promise.each(listUsers, function (userData) {
                        const user = {};
                        user.id = userData._id;
                        user.name = userData.name;
                        user.grade = userData.grade;
                        user.subject = userData.subject;
                        users.push(user);
                      })
                        .then(() => {
                          res.send({data: users, total: count})
                        })
                })
        })
        .catch(err => {
            next(err);
        })
}

function fetchDetail(req, res, next) {
    UserService.findById(req.params.id)
        .then(userDetail => {
            res.send(userDetail)
        })
        .catch(err => {
            next(err);
        })
}

function deleteUser(req, res, next) {
    UserService.findAndDelete(req.params.id)
        .then(() => {
            res.send({
                message: 'User deleted Successfully!',
                success: true
            })
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {
    createUser,
    listUsers,
    deleteUser,
    fetchDetail
};