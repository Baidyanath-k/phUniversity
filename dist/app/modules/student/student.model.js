"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const studentNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not capitalize formate',
        },
    },
    secondName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: '{VALUE} is number. Do not use number',
        },
    },
});
const studentGuardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: [true, "Father's name is required"],
    },
    fatherOccupation: {
        type: String,
        required: [true, "Father's occupation is required"],
    },
    fatherContactNo: {
        type: String,
        required: [true, "Father's contact number is required"],
    },
    motherName: { type: String, required: [true, "Mother's name is required"] },
    motherOccupation: {
        type: String,
        required: [true, "Mother's occupation is required"],
    },
    motherContactNo: {
        type: String,
        required: [true, "Mother's contact number is required"],
    },
});
const studentLocalGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "Local guardian's name is required"] },
    occupation: {
        type: String,
        required: [true, "Local guardian's occupation is required"],
    },
    contactNo: {
        type: String,
        required: [true, "Local guardian's contact number is required"],
    },
    address: {
        type: String,
        required: [true, "Local guardian's address is required"],
    },
});
const StudentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User MongDB ID must be required'],
        unique: true,
        ref: 'User',
    },
    name: {
        type: studentNameSchema,
        required: [true, 'Student name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'others'],
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (email) => validator_1.default.isEmail(email),
            message: '{VALUE} is not valid email',
        },
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required'],
    },
    dateOfBirth: { type: String },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Academic Semester MongoDB ID must be required"],
        unique: true,
        ref: 'AcademicModel'
    },
    guardian: {
        type: studentGuardianSchema,
        required: [true, 'Guardian information is required'],
    },
    profileImg: { type: String },
    localGuardian: {
        type: studentLocalGuardianSchema,
    },
}, { toJSON: { virtuals: true } });
StudentSchema.virtual('fullName').get(function () {
    return (this.name.firstName + ' ' + this.name.secondName + ' ' + this.name.lastName);
});
exports.StudentModel = (0, mongoose_1.model)('Student', StudentSchema);
