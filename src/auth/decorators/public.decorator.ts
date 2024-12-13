import { SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY } from "src/common/constants/roles-key-constant";

export const PublicAccess = () => SetMetadata (PUBLIC_KEY, true)