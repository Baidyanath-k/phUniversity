import express from 'express';
import authValidate from '../../utils/authValidation';
import { USER_ROLE } from '../user/user.const';
import { adminController } from './admin.controller';

const router = express.Router();

router.get(
    '/get-all-admin',
    authValidate(USER_ROLE.admin),
    adminController.getAllAdminCont
)

export const adminRouter = router;