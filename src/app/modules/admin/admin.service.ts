import { Admin } from "./admin.model";

const getAllAdminIntoDB = async () => {
    const result = await Admin.find();
    return result;
};

export const adminServices = {
    getAllAdminIntoDB,
}