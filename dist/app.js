"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const allRoutes_1 = __importDefault(require("./app/allRoutes"));
const globalErrorHandlers_1 = require("./app/middlewares/globalErrorHandlers");
const notFoundRout_1 = require("./app/middlewares/notFoundRout");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// route call by (allRoutes--> index.ts)
app.use('/api/v1', allRoutes_1.default);
app.get('/', (req, res) => {
    res.send('PH University!');
});
// global error handler from middlewares
app.use(globalErrorHandlers_1.globalErrorHandler);
// rout not found from middlewares
app.use(notFoundRout_1.notFountRoute);
exports.default = app;
