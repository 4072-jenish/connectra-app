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
exports.searchUser = exports.singleUser = exports.getAllUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const userService_1 = __importDefault(require("../Services/userService"));
const getAllUser = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.default.getAlluser();
        return res.json(users);
    }
    catch (error) {
        console.error("getAllUser error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllUser = getAllUser;
const singleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id: Number(req.params.id) },
        });
        return res.json(user);
    }
    catch (error) {
        console.error("singleUser error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.singleUser = singleUser;
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Search User :", req.query.search);
        const search = req.query.search;
        const users = yield userService_1.default.searchUser(search);
        console.log(users);
        return res.json(users);
    }
    catch (error) {
        console.error("searchUser error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.searchUser = searchUser;
//# sourceMappingURL=userController.js.map