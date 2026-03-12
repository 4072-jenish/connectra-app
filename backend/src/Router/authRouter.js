const express = require('express');
const { regUser, loginUser, editUser, deleteUser } = require('../Controller/authController');
const authMiddleware = require('../Middleware/authMddleware');

const authRouter = express.Router();

authRouter.use('/regUser', regUser);
authRouter.use('/login', loginUser);
authRouter.use('/editUser', authMiddleware ,editUser);
authRouter.use('/deleteUser', authMiddleware ,deleteUser);


module.exports = authRouter;