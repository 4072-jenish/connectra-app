const express = require('express');
const { allFollowers,toggleFollow } = require('../Controller/followerController');
const authMiddleware = require('../Middleware/authMddleware');

const followRouter = express.Router();

followRouter.get('/allFollowers' , authMiddleware ,allFollowers);
followRouter.get('/followUser/:id' , authMiddleware ,toggleFollow);


module.exports = followRouter;  