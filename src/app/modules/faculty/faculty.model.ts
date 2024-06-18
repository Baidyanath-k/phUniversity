import { Schema, model } from "mongoose";
import validator from "validator";
import { BloodGroup, Gender } from "./faculty.const";
import { TFaculty, TUserName } from "./faculty.interface";


const userNameSchema = new Schema<TUserName>({
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

const facultySchema = new Schema<TFaculty>({
    id: {
        type: String,
        required: [true, "Faculty ID must be required!"],
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
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
            values: Gender,
            message: `{VALUE} is not valid Gender`
        },
        required: [true, "Gender is required!!"]
    },
    bloodGroup: {
        type: String,
        enum: {
            values: BloodGroup,
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
            validator: (email: string) => validator.isEmail(email),
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
        type: Schema.Types.ObjectId,
        required: [true, "Academic Department ID is required"],
        ref: 'AcademicDepartment',
    }
},
    {
        toJSON: {
            virtuals: true,
        },
    }
);

facultySchema.virtual('fullName').get(function () {
    return (
        this?.name?.firstName +
        '' +
        this?.name?.middleName +
        '' +
        this?.name?.lastName
    );
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
facultySchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Faculty.findOne({ id });
    return existingUser;
};


export const Faculty = model<TFaculty>('Faculty', facultySchema);