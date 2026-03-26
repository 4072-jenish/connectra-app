"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likeController_1 = require("../Controller/likeController");
const authMddleware_1 = __importDefault(require("../Middleware/authMddleware"));
const likeRouter = (0, express_1.Router)();
likeRouter.get("/allLike-post/:id", authMddleware_1.default, likeController_1.allLikewithPost);
likeRouter.post("/toggleLike/:id", authMddleware_1.default, likeController_1.toggleLike);
exports.default = likeRouter;
