import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUserCont = catchAsync(async (req, res) => {
    const result = await authServices.loginUser(req.body);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Login successful....',
        data: result,
    });
});

const changedPasswordCont = catchAsync(async (req, res) => {

    const { ...passwordData } = req.body;
    const result = await authServices.changedPasswordSer(req.user, passwordData);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Password changed successfully....',
        data: result,
    });
});



export const authController = {
    loginUserCont,
    changedPasswordCont
}