import { Prisma, User } from "@prisma/client";
declare const _default: {
    getUserByEmail: (email: string) => Promise<User | null>;
    createUser: (data: Prisma.UserCreateInput) => Promise<User>;
    getUserById: (id: number) => Promise<User | null>;
    getFullUserProfile: (id: number) => Promise<({
        posts: ({
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
        })[];
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
        following: ({
            following: {
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
    } & {
        name: string;
        id: number;
        email: string;
        password: string;
        bio: string | null;
        avatar: string | null;
        createdAt: Date;
        isVerified: boolean;
        otp: string | null;
        otpExpiry: Date | null;
    }) | null>;
    editedUser: (id: number, data: any) => Promise<User>;
    verifiedUser: (email: string, data: any) => Promise<User>;
    deleteUserWithRelation: (userID: number) => Promise<{
        name: string;
        id: number;
        email: string;
        password: string;
        bio: string | null;
        avatar: string | null;
        createdAt: Date;
        isVerified: boolean;
        otp: string | null;
        otpExpiry: Date | null;
    }>;
};
export default _default;
//# sourceMappingURL=authService.d.ts.map