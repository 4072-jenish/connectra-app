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
const prisma_1 = __importDefault(require("../prisma"));
const addLike = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.like.create({ data: { userId, postId } });
    }
    catch (error) {
        console.error("likeService.addLike error:", error);
        throw error;
    }
});
const deleteLike = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.like.delete({
            where: { userId_postId: { userId, postId } },
        });
    }
    catch (error) {
        console.error("likeService.deleteLike error:", error);
        throw error;
    }
});
const getAllLikes = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.like.findMany({ where: { postId } });
    }
    catch (error) {
        console.error("likeService.getAllLikes error:", error);
        throw error;
    }
});
const findLike = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.like.findUnique({
            where: { userId_postId: { userId, postId } },
        });
    }
    catch (error) {
        console.error("likeService.findLike error:", error);
        throw error;
    }
});
exports.default = {
    addLike,
    deleteLike,
    getAllLikes,
    findLike,
};
