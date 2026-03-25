"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../Controller/commentController");
const authMddleware_1 = __importDefault(require("../Middleware/authMddleware"));
const validate_1 = require("../Middleware/validate");
const commentValidation_1 = require("../Validation/commentValidation");
const commonValidation_1 = require("../Validation/commonValidation");
const commentRouter = (0, express_1.Router)();
commentRouter.get("/allComment-post/:id", authMddleware_1.default, (0, validate_1.validateParams)(commonValidation_1.idParamSchema), commentController_1.allCommentPost);
commentRouter.post("/addComment/:id", authMddleware_1.default, (0, validate_1.validateParams)(commonValidation_1.idParamSchema), (0, validate_1.validateBody)(commentValidation_1.commentSchema), commentController_1.addComment);
commentRouter.put("/editComment/:id", authMddleware_1.default, (0, validate_1.validateParams)(commonValidation_1.idParamSchema), (0, validate_1.validateBody)(commentValidation_1.commentSchema), commentController_1.editComment);
commentRouter.delete("/deleteComment/:id", authMddleware_1.default, (0, validate_1.validateParams)(commonValidation_1.idParamSchema), commentController_1.deleteComment);
exports.default = commentRouter;
//# sourceMappingURL=commentRouter.js.map