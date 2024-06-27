import express from "express";
import authValidate from "../../utils/authValidation";
import requestValidate from "../../utils/validateRequest";
import { USER_ROLE } from "../user/user.const";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";

const router = express.Router();

// login router
router.post(
    '/login',
    requestValidate(authValidation.loginValidationSchema),
    authController.loginUserCont
);


// password changed
router.post(
    '/changed-password',
    authValidate(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    requestValidate(authValidation.changedPasswordValidationSchema),
    authController.changedPasswordCont,
);

// refresh Token router
router.post(
    '/refresh-token',
    requestValidate(authValidation.refreshTokenValidationSchema),
    authController.refreshTokenCont
)






export const AuthRoutes = router;