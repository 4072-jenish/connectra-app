"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../Controller/userController");
const authMddleware_1 = __importDefault(require("../Middleware/authMddleware"));
const userRouter = (0, express_1.Router)();
userRouter.get("/allUser", authMddleware_1.default, userController_1.getAllUser);
userRouter.get("/singleUser/:id", authMddleware_1.default, userController_1.singleUser);
userRouter.get("/search", authMddleware_1.default, userController_1.searchUser);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map