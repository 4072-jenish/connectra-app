const express = require('express');
const { allFollowers, followUser, unfollowUser } = require('../Controller/followerController');
const authMiddleware = require('../Middleware/authMddleware');

const followRouter = express.Router();

followRouter.get('/allFollowers' , authMiddleware ,allFollowers);
followRouter.get('/followUser/:id' , authMiddleware ,followUser);
followRouter.get('/unfollowUser/:id' , authMiddleware ,unfollowUser);


module.exports = followRouter;