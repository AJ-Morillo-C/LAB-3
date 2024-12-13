import { UserGender } from "src/common/enums/user-gender.enum";
import { UserRole } from "src/common/enums/user-role.enum";
import { UserEntity } from "src/users/entities/user.entity";

export type OmitPassword = Omit<UserEntity, 'password'>;
export type PartialUser = Partial<UserEntity>;

export type RecordUser = Record<string, UserEntity>;


const users:RecordUser = {
    "user1" : {
        id: "user1",
        name: "Ali",
        age: 20,
        email: "email",
        password: "password",
        role: UserRole.USER,
        isActive: true,
        gender: UserGender.MALE,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}