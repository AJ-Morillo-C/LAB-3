import { BaseEntity } from "src/common/config/base.entity";
import { Column, Entity } from "typeorm";

@Entity('order')
export class OrderEntity extends BaseEntity {

    @Column({type: 'date'})
    order_date: Date
}
