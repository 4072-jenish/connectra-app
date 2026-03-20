const express = require("express");
const {
  regUser,
  loginUser,
  editUser,
  deleteUser,
  userProfile,
  getUserById,
  verifyOTP
} = require("../Controller/authController");

const authMiddleware = require("../Middleware/authMddleware");
const upload = require("../Middleware/upload");

const { validateBody, validateParams } = require("../Middleware/validate");
const { registerSchema, loginSchema, verifyOtpSchema } = require("../Validation/authValidation");
const { idParamSchema } = require("../Validation/commonValidation");

const authRouter = express.Router();

authRouter.post(
  "/regUser",
  upload.single("avatar"),
  validateBody(registerSchema),
  regUser
);

authRouter.post("/login", validateBody(loginSchema), loginUser);

authRouter.get("/userProfile", authMiddleware, userProfile);

authRouter.get(
  "/user/:id",
  authMiddleware,
  validateParams(idParamSchema),
  getUserById
);

authRouter.put(
  "/editUser",
  authMiddleware,
  upload.single("avatar"),
  editUser
);

authRouter.delete("/deleteUser", authMiddleware, deleteUser);

authRouter.post("/verify-otp", validateBody(verifyOtpSchema), verifyOTP);

module.exports = authRouter;