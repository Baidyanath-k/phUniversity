import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.service";

const getAllAdminCont = catchAsync(async (req, res) => {
    const result = await adminServices.getAllAdminIntoDB();
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'All admin retrieve successfully!',
        data: result,
    });
});





export const adminController = {
    getAllAdminCont
}