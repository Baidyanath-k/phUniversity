"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
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
const facultyModel = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "Faculty ID must be required!"],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: [true, "User must be required!!"]
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
            values: ['male', 'female', 'others'],
            message: `{VALUE} is not valid Gender`
        },
        required: [true, "Gender is required!!"]
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
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
        ref: 'AcademicDepartment',
        required: [true, "Academic Department ID is required"]
    }
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
exports.Faculty = (0, mongoose_1.model)('Faculty', facultyModel);
