const express = require('express');
const { feedContent } = require('../Controller/feedController');
const authMiddleware = require('../Middleware/authMddleware');

const feedRouter = express.Router();


feedRouter.get('/posts' , authMiddleware ,feedContent)

module.exports = feedRouter;