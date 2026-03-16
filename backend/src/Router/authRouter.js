const express = require('express');
const { regUser, loginUser, editUser, deleteUser, userProfile } = require('../Controller/authController');
const authMiddleware = require('../Middleware/authMddleware');
const upload = require('../Middleware/upload');

const authRouter = express.Router();

authRouter.post('/regUser', upload.single("avatar") ,regUser);
authRouter.use('/login', loginUser);
authRouter.use('/userProfile', authMiddleware,  upload.single("avatar") ,userProfile);
authRouter.post('/editUser', authMiddleware , upload.single("avatar") ,editUser);
authRouter.use('/deleteUser', authMiddleware ,deleteUser);


module.exports = authRouter;