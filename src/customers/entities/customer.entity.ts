import { BaseEntity } from "./../../common/config/base.entity";
import { Column, Entity } from "typeorm";

@Entity('customer')
export class CustomerEntity extends BaseEntity {

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    contact: string;

    @Column({type: 'varchar'})
    address: string;

    @Column({type: 'varchar'})
    city: string;

    @Column({type: 'int'})
    postal_code: number;

    @Column({type: 'varchar'})
    country: string;

}
