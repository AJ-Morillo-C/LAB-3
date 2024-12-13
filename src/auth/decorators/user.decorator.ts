import { SetMetadata } from '@nestjs/common';
import { UserRole } from './../../common/enums/user-role.enum';
import { USER_KEY } from './../../common/constants/roles-key-constant';

export const UserAccess = () => SetMetadata (USER_KEY, UserRole.USER);