import { Router } from "express";
import {
  regUser,
  loginUser,
  editUser,
  deleteUser,
  userProfile,
  verifyOTP,
} from "../controller/authController";

import authMiddleware from "../middleware/authMddleware";
import upload from "../middleware/upload";

import { validateBody, validateParams } from "../middleware/validate";
import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
} from "../validation/authValidation";
import { idParamSchema } from "../validation/commonValidation";

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