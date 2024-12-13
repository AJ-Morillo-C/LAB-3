import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ResponseAllEmployees } from './interfaces/response-employees.interface';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ){}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
    try {
      const employee = await this.employeeRepository.save(createEmployeeDto);
      if( !employee ){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'employee not created!',
        });
      }
      return employee;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllEmployees> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] =await Promise.all([
        this.employeeRepository.count({ where: {isActive: true}}),
        this.employeeRepository.find({ where: {isActive: true}, take: limit, skip: skip})
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

  async findOne(id: string): Promise<EmployeeEntity> {
    try {
      const employee = this.employeeRepository.findOne({ where: {id}});

      if (!employee) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'employee not found!',
        })
      }

      return employee
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateemployeeDto: UpdateEmployeeDto): Promise<UpdateResult> {
    try {
      const employee = await this.employeeRepository.update( {id, isActive: true}, updateemployeeDto );
      if ( employee.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'employee not found!',
        })
      }

      return employee;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const employee = await this.employeeRepository.update({id, isActive:true},{isActive:false});
      if ( employee.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'employee not found',
        });
      }

      return employee;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}