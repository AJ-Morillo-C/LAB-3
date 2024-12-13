import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ResponseAllOrders } from './interfaces/response-orders.interface';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ){}

async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    try {
      const order = await this.orderRepository.save(createOrderDto);
      if( !order ){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'order not created!',
        });
      }
      return order;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllOrders> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [ total, data ] = await Promise.all([
        this.orderRepository.count( { where: { isActive: true } } ),
        this.orderRepository.createQueryBuilder('order')
        .where({isActive: true})
        .leftJoinAndSelect('order.supplier', 'supplier')
        .leftJoinAndSelect('order.category', 'category')
        .take(limit)
        .skip(skip)
        .getMany()
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<orderEntity> {
    try {
      const order = await this.orderRepository.createQueryBuilder('order')
      .where({id, isActive: true})
      .leftJoinAndSelect('order.supplier', 'supplier')
      .leftJoinAndSelect('order.category', 'category')
      .getOne()

      if (!order) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'order not found!',
        })
      }

      return order
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateorderDto: UpdateorderDto): Promise<UpdateResult> {
    try {
      const order = await this.orderRepository.update( {id, isActive: true}, updateorderDto );
      if ( order.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'order not found!',
        })
      }

      return order;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const order = await this.orderRepository.update({id, isActive:true},{isActive:false});
      if ( order.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'order not found',
        });
      }

      return order;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}