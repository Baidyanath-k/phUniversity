"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFountRoute = void 0;
const http_status_codes_1 = require("http-status-codes");
const notFountRoute = (req, res, next) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'API not found!!',
        error: ' ',
    });
};
exports.notFountRoute = notFountRoute;
