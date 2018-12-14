const express = require('express'),
  router = express.Router();

const UserController = require('../controllers/user.controller');


router.post('/user', UserController.createUser);
router.get('/users', UserController.listUsers);
router.get('/user/:id', UserController.fetchDetail);
router.patch('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;