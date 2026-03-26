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
exports.toggleLike = exports.allLikewithPost = void 0;
const likeService_1 = __importDefault(require("../Services/likeService"));
const allLikewithPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramId = Number(req.params.id);
        const likes = yield likeService_1.default.getAllLikes(paramId);
        return res.json(likes);
    }
    catch (error) {
        console.error("allLikewithPost error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.allLikewithPost = allLikewithPost;
const toggleLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const postId = Number(req.params.id);
        const exist = yield likeService_1.default.findLike(userId, postId);
        if (exist) {
            yield likeService_1.default.deleteLike(userId, postId);
            return res.json({ message: "Unliked" });
        }
        yield likeService_1.default.addLike(userId, postId);
        return res.json({ message: "Liked" });
    }
    catch (error) {
        console.error("toggleLike error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.toggleLike = toggleLike;
