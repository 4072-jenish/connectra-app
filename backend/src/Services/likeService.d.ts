declare const _default: {
    addLike: (userId: number, postId: number) => Promise<{
        id: number;
        userId: number;
        postId: number;
    }>;
    deleteLike: (userId: number, postId: number) => Promise<{
        id: number;
        userId: number;
        postId: number;
    }>;
    getAllLikes: (postId: number) => Promise<{
        id: number;
        userId: number;
        postId: number;
    }[]>;
    findLike: (userId: number, postId: number) => Promise<{
        id: number;
        userId: number;
        postId: number;
    } | null>;
};
export default _default;
//# sourceMappingURL=likeService.d.ts.map