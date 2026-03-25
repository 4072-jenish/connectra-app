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
exports.verifyOTP = exports.deleteUser = exports.editUser = exports.userProfile = exports.loginUser = exports.regUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const authService_1 = __importDefault(require("../Services/authService"));
// interface AuthRequest extends Request {
//   user : AuthUser
// }
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const regUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, bio } = req.body;
        const existingUser = yield authService_1.default.getUserByEmail(email);
        if (existingUser)
            return res.status(400).json({ message: "Already registered" });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        let avatarUrl = null;
        if (req.file) {
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            const upload = yield cloudinary_1.default.v2.uploader.upload(base64Image, {
                folder: "avatars",
            });
            avatarUrl = upload.secure_url;
        }
        const newUser = yield authService_1.default.createUser({
            name,
            email,
            password: hashedPassword,
            bio,
            avatar: avatarUrl,
            isVerified: false,
            otp,
            otpExpiry,
        });
        yield mail_1.default.send({
            to: email,
            from: "hariyanijenish@gmail.com",
            subject: "Verify Email",
            html: `<h1>${otp}</h1>`,
        });
        return res.status(201).json({ message: "OTP sent", email: newUser.email });
    }
    catch (error) {
        console.error("regUser error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.regUser = regUser;
const loginUser = (req, res, next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            console.error("loginUser error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (!user)
            return res.status(401).json({ message: info.message });
        if (!user.isVerified) {
            return res.status(403).json({ message: "Verify email first" });
        }
        req.logIn(user, { session: false }, (err) => {
            if (err) {
                console.error("loginUser req.logIn error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
            return res.json({ token, user });
        });
    })(req, res, next);
};
exports.loginUser = loginUser;
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        // const user = await userService.getUserById(req.user?.id);
        // return res.json(user);
    }
    catch (error) {
        console.error("userProfile error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.userProfile = userProfile;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = await userService.editedUser(req.user?.id, req.body);
        // return res.json({ user });
    }
    catch (error) {
        console.error("editUser error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = await userService.deleteUserWithRelation(req.user?.id);
        // return res.json({ user });
    }
    catch (error) {
        console.error("deleteUser error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteUser = deleteUser;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const user = yield authService_1.default.getUserByEmail(email);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        if (user.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP" });
        if (!user.otpExpiry || user.otpExpiry < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }
        yield authService_1.default.verifiedUser(email, {
            isVerified: true,
            otp: null,
            otpExpiry: null,
        });
        return res.json({ message: "Verified" });
    }
    catch (error) {
        console.error("verifyOTP error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.verifyOTP = verifyOTP;
//# sourceMappingURL=authController.js.map