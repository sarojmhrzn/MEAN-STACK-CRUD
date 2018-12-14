"use strict";

const User = require('../models/user.model');

/**
 * Create User
 * @param userParams
 * @return Promise
 *  resolve{User} if User is Created
 *  reject{Error} if error is encountered
 */
function create(userParams) {
  return new Promise((resolve, reject) => {
    let user = new User(userParams);
    user.save()
      .then(userCreated => {
        resolve(userCreated);
      })
      .catch(err => {
        reject(err);
      })

  })
}

/**
 * Find all users
 * @queryParams skip, limit
 */
function findAll(query) {
  return new Promise((resolve, reject) => {
    const perPage = +query.limit;
    const page = Math.max(0, +query.pageno - 1);

    User.find({})
      .limit(perPage)
      .skip(perPage * page)
      .then(userListed => {
        resolve(userListed)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 *
 * @param id
 * @returns {*}
 */
function findById(params) {
  return new Promise((resolve, reject) => {
    User.findById(params)
      .exec(function (err, list) {
        if (err) {
          reject(err);
        } else {
          resolve(list);
        }
      })
  })
}

/**
 *
 * @param id
 * @returns {*}
 */

function update(userId, params) {
  return new Promise((resolve, reject) => {
    User.update({
      '_id': userId
    }, {
      '$set': params
    })
      .then(updatedUser => {
        resolve(updatedUser)
      })
      .catch(err => {
        reject(err);
      })
  })
}

/**
 *
 * @param id
 * @returns {*}
 */
function findAndDelete(params) {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(params)
      .then(deletedUser => {
        resolve(deletedUser)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * Count all users
 * @returns Count
 */
function countAll() {
  return User.countDocuments();
}

module.exports = {
  create,
  findAll,
  findById,
  findAndDelete,
  countAll,
  update
};