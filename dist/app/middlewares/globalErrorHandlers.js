"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = 500;
    const message = err.message || 'Something went wrong!';
    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
};
exports.globalErrorHandler = globalErrorHandler;
