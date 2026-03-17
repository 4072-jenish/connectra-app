const express = require('express');
const { regUser, loginUser, editUser, deleteUser, userProfile, getUserById, verifyOTP } = require('../Controller/authController');
const authMiddleware = require('../Middleware/authMddleware');
const upload = require('../Middleware/upload');

const authRouter = express.Router();

authRouter.post('/regUser', upload.single("avatar") ,regUser);
authRouter.use('/login', loginUser);
authRouter.use('/userProfile', authMiddleware,  upload.single("avatar") ,userProfile);
authRouter.get("/user/:id", authMiddleware, getUserById);
authRouter.post('/editUser', authMiddleware , upload.single("avatar") ,editUser);
authRouter.use('/deleteUser', authMiddleware ,deleteUser);
authRouter.post('/verify-otp', verifyOTP);


module.exports = authRouter;