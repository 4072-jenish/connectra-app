const express = require('express');
const { allFollowers,toggleFollow, allFollowing } = require('../Controller/followerController');
const authMiddleware = require('../Middleware/authMddleware');

const followRouter = express.Router();

followRouter.get('/allFollowers' , authMiddleware ,allFollowers);
followRouter.get('/allFollowing' , authMiddleware ,allFollowing);
followRouter.get('/followUser/:id' , authMiddleware ,toggleFollow);


module.exports = followRouter;  