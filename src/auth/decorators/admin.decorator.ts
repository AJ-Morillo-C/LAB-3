import { SetMetadata } from '@nestjs/common';
import { UserRole } from './../../common/enums/user-role.enum';
import { ADMIN_KEY } from './../../common/constants/roles-key-constant';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, UserRole.ADMIN);