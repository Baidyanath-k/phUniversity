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
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const faculty_const_1 = require("./faculty.const");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "User First Name must be required"],
        trim: true,
        maxlength: [20, "First name can not be more than 20 Characters"]
    },
    middleName: {
        type: String,
        trim: true,
        maxlength: [20, 'Middle name can not be more than 20 characters']
    },
    lastName: {
        type: String,
        required: [true, "User First Name must be required"],
        trim: true,
        maxlength: [20, "Last name can not be more than 20 Characters"]
    }
});
const facultySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "Faculty ID must be required!"],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: true,
        required: [true, "User must be required!!"],
        ref: "User",
    },
    designation: {
        type: String,
        required: [true, "Faculty Designation is required!!"],
    },
    name: {
        type: userNameSchema,
        required: [true, "User name (Faculty) is required!! "]
    },
    gender: {
        type: String,
        enum: {
            values: faculty_const_1.Gender,
            message: `{VALUE} is not valid Gender`
        },
        required: [true, "Gender is required!!"]
    },
    bloodGroup: {
        type: String,
        enum: {
            values: faculty_const_1.BloodGroup,
            message: `{VALUE} is not valid blood group`
        },
    },
    dateOfBirth: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email must be required!!"],
        unique: true,
        validate: {
            validator: (email) => validator_1.default.isEmail(email),
            message: '{VALUE} is not valid email',
        },
    },
    contactNo: {
        type: String,
        required: [true, "Contact No. Must be required!!"],
        unique: true,
    },
    emergencyContactNo: {
        type: String,
        required: [true, "Emergency Contact No. Must be required!!"],
        unique: true,
    },
    presentAddress: {
        type: String,
        required: [true, "Present Address required!!"],
    },
    permanentAddress: {
        type: String,
        required: [true, "Permanent Address required!!"],
    },
    profileImg: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Academic Department ID is required"],
        ref: 'AcademicDepartment',
    }
}, {
    toJSON: {
        virtuals: true,
    },
});
facultySchema.virtual('fullName').get(function () {
    var _a, _b, _c;
    return (((_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName) +
        '' +
        ((_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.middleName) +
        '' +
        ((_c = this === null || this === void 0 ? void 0 : this.name) === null || _c === void 0 ? void 0 : _c.lastName));
});
// filter out deleted documents
facultySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
facultySchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
facultySchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
//checking if user is already exist!
facultySchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Faculty.findOne({ id });
        return existingUser;
    });
};
exports.Faculty = (0, mongoose_1.model)('Faculty', facultySchema);
