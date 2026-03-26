"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../Controller/postController");
const authMddleware_1 = __importDefault(require("../Middleware/authMddleware"));
const upload_1 = __importDefault(require("../Middleware/upload"));
const postRouter = (0, express_1.Router)();
postRouter.get("/allPost", authMddleware_1.default, postController_1.allPosts);
postRouter.get("/userPost", authMddleware_1.default, postController_1.userPost);
postRouter.post("/addPost", authMddleware_1.default, upload_1.default.single("image"), postController_1.addPost);
postRouter.put("/editPost/:id", authMddleware_1.default, upload_1.default.single("image"), postController_1.editPost);
postRouter.delete("/deletePost/:id", authMddleware_1.default, postController_1.deletePost);
exports.default = postRouter;
