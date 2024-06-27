"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'ID is required!!' }),
        password: zod_1.z.string({ required_error: "Password is required!!" }),
    })
});
const changedPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: "Old password is required!!" }),
        newPassword: zod_1.z.string({ required_error: "New password is required!!" }),
    })
});
exports.authValidation = {
    loginValidationSchema,
    changedPasswordValidationSchema
};
