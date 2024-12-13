import { IsDate, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
 

    @IsDate()
    @IsNotEmpty()    
    order_date: Date;
}
