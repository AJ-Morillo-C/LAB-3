import { BaseEntity } from "src/common/config/base.entity";
import { Column, Entity } from "typeorm";

@Entity('employee')
export class EmployeeEntity extends BaseEntity {

    @Column({type: 'varchar'})
    last_name: string;
    
    @Column({type: 'varchar'})
    first_name: string;

    @Column({type: 'date'})
    birth_date: Date; 

    @Column({type: 'varchar'})
    city: string;

    @Column({type: 'varchar'})
    phone: string;

    @Column({type: 'varchar'})
    note?: string;

}
