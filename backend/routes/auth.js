const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/googleLogin', AuthController.googleLogin);

module.exports = router;
