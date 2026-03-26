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
exports.toggleFollow = exports.getFollowData = void 0;
const followService_1 = __importDefault(require("../Services/followService"));
const getFollowData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const data = yield followService_1.default.getFollowData(userId);
        return res.json(data);
    }
    catch (error) {
        console.error("getFollowData error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getFollowData = getFollowData;
const toggleFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const followerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const followingId = Number(req.params.id);
        const existing = yield followService_1.default.findFollow(followerId, followingId);
        if (existing) {
            yield followService_1.default.deleteFollow(followerId, followingId);
            return res.json({ followed: false });
        }
        yield followService_1.default.addFollow(followerId, followingId);
        return res.json({ followed: true });
    }
    catch (error) {
        console.error("toggleFollow error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.toggleFollow = toggleFollow;
