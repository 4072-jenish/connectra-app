const express =require('express');
const { allCommentPost, addComment, editComment, deleteComment } = require('../Controller/commentController');
const authMiddleware = require('../Middleware/authMddleware');

const commentRouter = express.Router();


commentRouter.get('/allComment-post/:id' , authMiddleware ,allCommentPost);
commentRouter.post('/addComment/:id' , authMiddleware ,addComment);
commentRouter.put('/editComment/:id' , authMiddleware ,editComment);
commentRouter.delete('/deleteComment/:id' , authMiddleware ,deleteComment);

module.exports = commentRouter