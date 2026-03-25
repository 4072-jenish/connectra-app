import { Comment } from "@prisma/client";
declare const _default: {
    allCommentOfPost: (postId: number) => Promise<({
        user: {
            name: string;
            id: number;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        text: string;
        userId: number;
        postId: number;
    })[]>;
    findComment: (commentId: number, userId: number) => Promise<Comment | null>;
    addComment: (userId: number, postId: number, text: string) => Promise<Comment>;
    editCommnet: (commentId: number, text: string) => Promise<Comment>;
    deleteComment: (commentId: number, userId: number) => Promise<{
        id: number;
        createdAt: Date;
        text: string;
        userId: number;
        postId: number;
    }>;
};
export default _default;
//# sourceMappingURL=commentService.d.ts.map