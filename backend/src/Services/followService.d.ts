declare const _default: {
    getFollowData: (userId: number) => Promise<{
        followers: ({
            follower: {
                name: string;
                id: number;
                email: string;
                avatar: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            followerId: number;
            followingId: number;
        })[];
        following: {
            followingId: number;
        }[];
    }>;
    findFollow: (followerId: number, followingId: number) => Promise<{
        id: number;
        createdAt: Date;
        followerId: number;
        followingId: number;
    } | null>;
    addFollow: (followerId: number, followingId: number) => Promise<{
        id: number;
        createdAt: Date;
        followerId: number;
        followingId: number;
    }>;
    deleteFollow: (followerId: number, followingId: number) => Promise<{
        id: number;
        createdAt: Date;
        followerId: number;
        followingId: number;
    }>;
};
export default _default;
//# sourceMappingURL=followService.d.ts.map