import { Module } from '@nestjs/common';

import { SuppliersService } from './suppliers.service';
import { SuppliersController } from "./suppliers.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';

@Module({
    controllers: [SuppliersController],
    providers: [ SuppliersService ],
    exports: [],
    imports: [
        TypeOrmModule.forFeature([SupplierEntity])
    ],
})
export class SuppliersModule {}