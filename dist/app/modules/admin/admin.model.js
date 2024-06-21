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
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const admin_const_1 = require("./admin.const");
const adminNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name must be required!'],
        trim: true,
        validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not capitalize formate!',
        },
    },
    middleName: {
        type: String,
        required: [true, 'Middle name must be required!'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name must be required!'],
        trim: true,
    },
});
const adminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: [true, 'Admin ID is required!'],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User is required!'],
        unique: true,
        ref: 'User',
    },
    designation: {
        type: String,
        required: [true, 'Designation is required!'],
    },
    name: {
        type: adminNameSchema,
        required: [true, 'Name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: admin_const_1.AdminGender,
            message: `{VALUE} is not valid gender`,
        },
        required: [true, 'Admin Gender is required!!'],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: admin_const_1.AdminBloodGroup,
            message: `{VALUE} is not valid blood group`,
        },
        required: [true, 'Blood group is required!!'],
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of birth is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: {
            validator: (email) => validator_1.default.isEmail(email),
            message: '{VALUE} is not valid email',
        },
    },
    contactNo: {
        type: String,
        required: [true, 'Contact no is required!'],
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency Contact no is required!'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address no is required!'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address no is required!'],
    },
    profileImg: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
adminSchema.virtual('fullName').get(function () {
    var _a, _b, _c;
    return (((_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName) +
        ' ' +
        ((_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.middleName) +
        ' ' +
        ((_c = this === null || this === void 0 ? void 0 : this.name) === null || _c === void 0 ? void 0 : _c.lastName));
});
adminSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
adminSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
adminSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const exitingUser = yield exports.Admin.findOne({ id });
        return exitingUser;
    });
};
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
