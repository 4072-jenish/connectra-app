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
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.findUnique({ where: { email } });
    }
    catch (error) {
        console.error("authService.getUserByEmail error:", error);
        throw error;
    }
});
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.create({ data });
    }
    catch (error) {
        console.error("authService.createUser error:", error);
        throw error;
    }
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.findUnique({ where: { id } });
    }
    catch (error) {
        console.error("authService.getUserById error:", error);
        throw error;
    }
});
const getFullUserProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.findUnique({
            where: { id },
            include: {
                posts: {
                    include: { likes: true, comments: true },
                },
                followers: {
                    include: {
                        follower: {
                            select: { id: true, name: true, email: true, avatar: true },
                        },
                    },
                },
                following: {
                    include: {
                        following: {
                            select: { id: true, name: true, email: true, avatar: true },
                        },
                    },
                },
            },
        });
    }
    catch (error) {
        console.error("authService.getFullUserProfile error:", error);
        throw error;
    }
});
const editedUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                bio: data.bio,
                avatar: data.avatar,
            },
        });
    }
    catch (error) {
        console.error("authService.editedUser error:", error);
        throw error;
    }
});
const verifiedUser = (email, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.update({
            where: { email },
            data: {
                isVerified: data.isVerified,
                otp: data.otp,
                otpExpiry: data.otpExpiry,
            },
        });
    }
    catch (error) {
        console.error("authService.verifiedUser error:", error);
        throw error;
    }
});
const deleteUserWithRelation = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield tx.user.findUnique({ where: { id: userID } });
            if (!user)
                throw new Error("USER_NOT_FOUND");
            yield tx.follow.deleteMany({
                where: {
                    OR: [{ followerId: userID }, { followingId: userID }],
                },
            });
            yield tx.like.deleteMany({ where: { userId: userID } });
            yield tx.comment.deleteMany({ where: { userId: userID } });
            yield tx.post.deleteMany({ where: { authorId: userID } });
            return tx.user.delete({ where: { id: userID } });
        }));
    }
    catch (error) {
        console.error("authService.deleteUserWithRelation error:", error);
        throw error;
    }
});
exports.default = {
    getUserByEmail,
    createUser,
    getUserById,
    getFullUserProfile,
    editedUser,
    verifiedUser,
    deleteUserWithRelation,
};
//# sourceMappingURL=authService.js.map