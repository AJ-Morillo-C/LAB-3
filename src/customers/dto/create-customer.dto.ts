import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateCustomerDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    @IsNotEmpty()
    contact: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsNotEmpty()
    postal_code: number;

    @IsString()
    @IsNotEmpty()
    country: string;
}
