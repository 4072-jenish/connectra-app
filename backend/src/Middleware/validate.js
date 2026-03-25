"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateBody = void 0;
const validateBody = (schema) => (req, res, next) => {
    var _a;
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (error) {
        // Useful during debugging: tells you exactly which field failed and why.
        console.error("validateBody failed:", JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.errors) !== null && _a !== void 0 ? _a : error));
        return res.status(400).json({
            errors: error.errors.map((e) => ({
                field: e.path[0],
                message: e.message,
            })),
        });
    }
};
exports.validateBody = validateBody;
const validateParams = (schema) => (req, res, next) => {
    var _a;
    try {
        console.log("Comming from validation");
        req.params = schema.parse(req.params);
        next();
    }
    catch (error) {
        // Useful during debugging: tells you exactly why `:id` didn't validate.
        console.error("validateParams failed:", JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.errors) !== null && _a !== void 0 ? _a : error));
        return res.status(400).json({
            message: "Invalid params",
        });
    }
};
exports.validateParams = validateParams;
//# sourceMappingURL=validate.js.map