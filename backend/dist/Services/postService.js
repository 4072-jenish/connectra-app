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
const cloudinary_1 = __importDefault(require("../Utils/cloudinary"));
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.post.findMany({
            include: {
                author: { select: { id: true, name: true, avatar: true } },
                likes: true,
                comments: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    catch (error) {
        console.error("postService.getAllPosts error:", error);
        throw error;
    }
});
const createPost = (userId, content, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageUrl = null;
        let publicId = null;
        if (file) {
            const result = yield new Promise((resolve, reject) => {
                const stream = cloudinary_1.default.uploader.upload_stream({ folder: "posts" }, (error, result) => {
                    if (error)
                        return reject(error);
                    resolve(result);
                });
                stream.end(file.buffer);
            });
            imageUrl = result.secure_url;
            publicId = result.public_id;
        }
        return yield prisma_1.default.post.create({
            data: { content, image: imageUrl, publicId, authorId: userId },
        });
    }
    catch (error) {
        console.error("postService.createPost error:", error);
        throw error;
    }
});
const getPostsByUser = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = Array.isArray(userIds) ? userIds : [userIds];
        return yield prisma_1.default.post.findMany({
            where: { authorId: { in: ids } },
            include: {
                author: { select: { id: true, name: true, avatar: true } },
                likes: true,
                comments: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    catch (error) {
        console.error("postService.getPostsByUser error:", error);
        throw error;
    }
});
const updatePost = (postId, userId, content, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma_1.default.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new Error("POST_NOT_FOUND");
        if (post.authorId !== userId)
            throw new Error("UNAUTHORIZED");
        let imageUrl = post.image;
        let publicId = post.publicId;
        if (file) {
            if (post.publicId) {
                yield cloudinary_1.default.uploader.destroy(post.publicId);
            }
            const result = yield new Promise((resolve, reject) => {
                const stream = cloudinary_1.default.uploader.upload_stream({ folder: "posts" }, (error, result) => {
                    if (error)
                        return reject(error);
                    resolve(result);
                });
                stream.end(file.buffer);
            });
            imageUrl = result.secure_url;
            publicId = result.public_id;
        }
        return yield prisma_1.default.post.update({
            where: { id: postId },
            data: { content, image: imageUrl, publicId },
        });
    }
    catch (error) {
        console.error("postService.updatePost error:", error);
        throw error;
    }
});
const deletePostWithRelations = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma_1.default.post.findFirst({
            where: { id: postId, authorId: userId },
        });
        if (!post)
            throw new Error("UNAUTHORIZED");
        return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx.like.deleteMany({ where: { postId } });
            yield tx.comment.deleteMany({ where: { postId } });
            if (post.publicId) {
                yield cloudinary_1.default.uploader.destroy(post.publicId);
            }
            yield tx.post.delete({ where: { id: postId } });
            return true;
        }));
    }
    catch (error) {
        console.error("postService.deletePostWithRelations error:", error);
        throw error;
    }
});
exports.default = {
    getAllPosts,
    createPost,
    getPostsByUser,
    updatePost,
    deletePostWithRelations,
};
