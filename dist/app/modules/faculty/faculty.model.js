"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const facultyModel = new mongoose_1.Schema({});
exports.Faculty = (0, mongoose_1.model)('Faculty', facultyModel);
