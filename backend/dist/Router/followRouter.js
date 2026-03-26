"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const followerController_1 = require("../Controller/followerController");
const authMddleware_1 = __importDefault(require("../Middleware/authMddleware"));
const validate_1 = require("../Middleware/validate");
const commonValidation_1 = require("../Validation/commonValidation");
const followRouter = (0, express_1.Router)();
followRouter.get("/getFollowData", authMddleware_1.default, followerController_1.getFollowData);
followRouter.post("/followUser/:id", authMddleware_1.default, (0, validate_1.validateParams)(commonValidation_1.idParamSchema), followerController_1.toggleFollow);
exports.default = followRouter;
