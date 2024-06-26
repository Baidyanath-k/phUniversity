import express from "express";
import requestValidate from "../../utils/validateRequest";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
    '/login',
    requestValidate(authValidation.loginValidationSchema),
    authController.loginUserCont
);





export const AuthRoutes = router;