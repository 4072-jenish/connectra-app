import { Router } from "express";
import {
  regUser,
  loginUser,
  editUser,
  deleteUser,
  userProfile,
  verifyOTP,
} from "../Controller/authController";

import authMiddleware from "../Middleware/authMddleware";
import upload from "../Middleware/upload";

import { validateBody, validateParams } from "../Middleware/validate";
import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
} from "../Validation/authValidation";
import { idParamSchema } from "../Validation/commonValidation";

const authRouter = Router();

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
  userProfile
);

authRouter.put(
  "/editUser",
  authMiddleware,
  upload.single("avatar"),
  editUser
);

authRouter.delete("/deleteUser", authMiddleware, deleteUser);

authRouter.post("/verify-otp", validateBody(verifyOtpSchema), verifyOTP);

export default authRouter;