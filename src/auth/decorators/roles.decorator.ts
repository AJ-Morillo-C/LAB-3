import { SetMetadata } from '@nestjs/common';
import { UserRole} from './../../common/enums/user-role.enum';

export const RolesAccess = (...roles: Array< keyof typeof UserRole>) => SetMetadata(UserRole, roles);