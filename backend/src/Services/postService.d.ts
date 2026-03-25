declare const _default: {
    getAllPosts: () => Promise<({
        author: {
            name: string;
            id: number;
            avatar: string | null;
        };
        likes: {
            id: number;
            userId: number;
            postId: number;
        }[];
        comments: {
            id: number;
            createdAt: Date;
            text: string;
            userId: number;
            postId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        content: string;
        image: string | null;
        publicId: string | null;
        authorId: number;
    })[]>;
    createPost: (userId: number, content: string, file?: Express.Multer.File) => Promise<{
        id: number;
        createdAt: Date;
        content: string;
        image: string | null;
        publicId: string | null;
        authorId: number;
    }>;
    getPostsByUser: (userIds: number | number[]) => Promise<({
        author: {
            name: string;
            id: number;
            avatar: string | null;
        };
        likes: {
            id: number;
            userId: number;
            postId: number;
        }[];
        comments: {
            id: number;
            createdAt: Date;
            text: string;
            userId: number;
            postId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        content: string;
        image: string | null;
        publicId: string | null;
        authorId: number;
    })[]>;
    updatePost: (postId: number, userId: number, content: string, file?: Express.Multer.File) => Promise<{
        id: number;
        createdAt: Date;
        content: string;
        image: string | null;
        publicId: string | null;
        authorId: number;
    }>;
    deletePostWithRelations: (postId: number, userId: number) => Promise<boolean>;
};
export default _default;
//# sourceMappingURL=postService.d.ts.map