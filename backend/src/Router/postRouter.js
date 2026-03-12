const express = require('express');
const { addPost, allPosts, userPost, singlePost, editPost, deletePost } = require('../Controller/postController');
const authMiddleware = require('../Middleware/authMddleware');
const upload = require('../Middleware/upload');

const postRouter = express.Router();

postRouter.get('/allPost' , authMiddleware ,allPosts);
postRouter.get('/userPost' , authMiddleware ,userPost);
postRouter.get('/singlePost/:id' , authMiddleware ,singlePost);
postRouter.post('/addPost', authMiddleware, upload.single("image") , addPost);
postRouter.put('/editPost/:id', authMiddleware, upload.single("image") , editPost);
postRouter.delete('/deletePost/:id', authMiddleware, deletePost);


module.exports = postRouter;