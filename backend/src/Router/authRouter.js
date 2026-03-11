const express = require('express');
const { regUser } = require('../Controller/authController');

const authRouter = express.Router();

authRouter.use('/regUser', regUser)


module.exports = authRouter;