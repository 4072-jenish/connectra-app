const express = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const  followRouter = require('./followRouter');
const postRouter = require('./postRouter');
const likeRouter = require('./likeRouter');
const commentRouter = require('./commentRouter');
const feedRouter = require('./feedRouter');

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/user', userRouter);
indexRouter.use('/follow', followRouter);
indexRouter.use('/post', postRouter);
indexRouter.use('/like', likeRouter);
indexRouter.use('/comment', commentRouter);
indexRouter.use('/feed', feedRouter);
 
module.exports = indexRouter;