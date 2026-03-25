"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../Controller/authController");
const authMddleware_1 = __importDefault(require("../Middleware/authMddleware"));
const upload_1 = __importDefault(require("../Middleware/upload"));
const validate_1 = require("../Middleware/validate");
const authValidation_1 = require("../Validation/authValidation");
const commonValidation_1 = require("../Validation/commonValidation");
const authRouter = (0, express_1.Router)();
authRouter.post("/regUser", upload_1.default.single("avatar"), (0, validate_1.validateBody)(authValidation_1.registerSchema), authController_1.regUser);
authRouter.post("/login", (0, validate_1.validateBody)(authValidation_1.loginSchema), authController_1.loginUser);
authRouter.get("/userProfile", authMddleware_1.default, authController_1.userProfile);
authRouter.get("/user/:id", authMddleware_1.default, (0, validate_1.validateParams)(commonValidation_1.idParamSchema), authController_1.userProfile);
authRouter.put("/editUser", authMddleware_1.default, upload_1.default.single("avatar"), authController_1.editUser);
authRouter.delete("/deleteUser", authMddleware_1.default, authController_1.deleteUser);
authRouter.post("/verify-otp", (0, validate_1.validateBody)(authValidation_1.verifyOtpSchema), authController_1.verifyOTP);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map