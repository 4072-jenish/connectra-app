const express = require('express');
const { getAllUser, singleUser, searchUser } = require('../Controller/userController');
const authMiddleware = require('../Middleware/authMddleware');

const userRouter = express.Router();


userRouter.get('/allUser', authMiddleware ,getAllUser);
userRouter.get('/singleUser/:id', authMiddleware ,singleUser);
userRouter.get('/search', authMiddleware ,searchUser);

module.exports = userRouter;