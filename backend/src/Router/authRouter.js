const express = require('express');
const { regUser, loginUser, editUser, deleteUser, userProfile } = require('../Controller/authController');
const authMiddleware = require('../Middleware/authMddleware');
const upload = require('../Middleware/upload');

const authRouter = express.Router();

authRouter.use('/regUser', upload.single("avatar") ,regUser);
authRouter.use('/login', loginUser);
authRouter.use('/userProfile', authMiddleware,  upload.single("avatar") ,userProfile);
authRouter.use('/editUser', authMiddleware ,editUser);
authRouter.use('/deleteUser', authMiddleware ,deleteUser);


module.exports = authRouter;