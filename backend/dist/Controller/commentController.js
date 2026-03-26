"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.editComment = exports.addComment = exports.allCommentPost = void 0;
const commentService_1 = __importDefault(require("../Services/commentService"));
const allCommentPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const comments = yield commentService_1.default.allCommentOfPost(postId);
        return res.json(comments);
    }
    catch (error) {
        console.error("allCommentPost error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.allCommentPost = allCommentPost;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const paramsId = req.params.id;
        const text = req.body.comment;
        const comment = yield commentService_1.default.addComment(userId, paramsId, text);
        return res.json(comment);
    }
    catch (error) {
        console.error("addComment error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addComment = addComment;
const editComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.id;
        const text = req.body.comment;
        const comment = yield commentService_1.default.editCommnet(commentId, text);
        return res.json(comment);
    }
    catch (error) {
        console.error("editComment error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.editComment = editComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const commentId = req.params.id;
        yield commentService_1.default.deleteComment(commentId, userId);
        return res.json({ message: "Deleted" });
    }
    catch (error) {
        console.error("deleteComment error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteComment = deleteComment;
