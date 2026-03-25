import { User } from "@prisma/client";
declare const _default: {
    getAlluser: () => Promise<User[]>;
    findUser: (id: number) => Promise<User | null>;
    searchUser: (search: string) => Promise<{
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
    }[]>;
};
export default _default;
//# sourceMappingURL=userService.d.ts.map