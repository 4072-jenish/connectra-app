const express = require('express');
const {toggleFollow , getFollowData} = require('../Controller/followerController');
const authMiddleware = require('../Middleware/authMddleware');

const followRouter = express.Router();

followRouter.get('/getFollowData' , authMiddleware ,getFollowData);
followRouter.get('/followUser/:id' , authMiddleware ,toggleFollow);


module.exports = followRouter;  