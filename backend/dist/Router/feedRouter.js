"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedController_1 = require("../Controller/feedController");
const authMddleware_1 = __importDefault(require("../Middleware/authMddleware"));
const feedRouter = (0, express_1.Router)();
feedRouter.get("/posts", authMddleware_1.default, feedController_1.feedContent);
exports.default = feedRouter;
