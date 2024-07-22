const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.post('/signup', userController.signup);
router.post('/signin', userController.login);

module.exports = router;