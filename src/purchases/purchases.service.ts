import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from './entities/purchase.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ResponseAllPurchases } from './interfaces/response-purchases.interface';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchasesService {

  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
  ){}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<PurchaseEntity> {
    try {
      const purchase = await this.purchaseRepository.save(createPurchaseDto);
      if( !purchase ){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'purchase not created!',
        });
      }
      return purchase;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllPurchases> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [ total, data ] = await Promise.all([
        this.purchaseRepository.count( { where: { isActive: true } } ),
        this.purchaseRepository.createQueryBuilder('purchase')
        .where({isActive: true})
        .leftJoinAndSelect('purchase.paymentMethod', 'paymentMethod')
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

  async findOne(id: string): Promise<PurchaseEntity> {
    try {
      const purchase = await this.purchaseRepository.createQueryBuilder('purchase')
      .where({id, isActive: true})
      .leftJoinAndSelect('purchase.paymentMethod', 'paymentMethod')
      .getOne()

      if (!purchase) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'purchase not found!',
        })
      }

      return purchase
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<UpdateResult> {
    try {
      const purchase = await this.purchaseRepository.update( {id, isActive: true}, updatePurchaseDto );
      if ( purchase.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'purchase not found!',
        })
      }

      return purchase;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const purchase = await this.purchaseRepository.update({id, isActive:true},{isActive:false});
      if ( purchase.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'purchase not found',
        });
      }

      return purchase;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}