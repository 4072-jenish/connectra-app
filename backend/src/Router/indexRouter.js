const express = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const  followRouter = require('./followRouter');
const postRouter = require('./postRouter');

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/user', userRouter);
indexRouter.use('/follow', followRouter);
indexRouter.use('/post', postRouter);

module.exports = indexRouter;