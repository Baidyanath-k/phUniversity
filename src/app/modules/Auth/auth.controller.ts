import { StatusCodes } from "http-status-codes";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUserCont = catchAsync(async (req, res) => {
    const result = await authServices.loginUser(req.body);

    const { refreshToken, needsPasswordChange, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Login successful....',
        data: {
            accessToken,
            needsPasswordChange
        },
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

const refreshTokenCont = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await authServices.refreshToken(refreshToken);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Access token retrieve successfully....',
        data: result,
    });
})



export const authController = {
    loginUserCont,
    changedPasswordCont,
    refreshTokenCont
}