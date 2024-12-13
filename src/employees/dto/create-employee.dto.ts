import { IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateEmployeeDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    last_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    first_name: string;

    @IsDate()
    @IsNotEmpty()
    birth_date: Date; 
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    city: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsOptional()
    note?: string;
    
}
