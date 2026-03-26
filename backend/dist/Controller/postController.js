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
exports.deletePost = exports.userPost = exports.editPost = exports.addPost = exports.allPosts = void 0;
const postService_1 = __importDefault(require("../Services/postService"));
const allPosts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postService_1.default.getAllPosts();
        return res.json(posts);
    }
    catch (error) {
        console.error("allPosts error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.allPosts = allPosts;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const content = req.body.content;
        const file = req.file;
        const post = yield postService_1.default.createPost(userId, content, file);
        return res.json(post);
    }
    catch (error) {
        console.error("addPost error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.addPost = addPost;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const content = req.body.content;
        const file = req.file;
        const post = yield postService_1.default.updatePost(Number(req.params.id), userId, content, file);
        return res.json(post);
    }
    catch (error) {
        console.error("editPost error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.editPost = editPost;
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const posts = yield postService_1.default.getPostsByUser(userId);
        return res.json(posts);
    }
    catch (error) {
        console.error("userPost error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.userPost = userPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const paramsId = req.params.id;
        yield postService_1.default.deletePostWithRelations(paramsId, userId);
        return res.json({ message: "Deleted" });
    }
    catch (error) {
        console.error("deletePost error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletePost = deletePost;
