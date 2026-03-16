const express = require('express');
const { allLikewithPost, toggleLike } = require('../Controller/likeController');
const authMiddleware = require('../Middleware/authMddleware');

const likeRouter = express.Router();

likeRouter.get('/allLike-post/:id' , authMiddleware ,allLikewithPost);
likeRouter.post('/toggleLike/:id' , authMiddleware ,toggleLike);


module.exports = likeRouter 