import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {FindOptionsWhere, ILike, LessThan, Repository} from 'typeorm';
import {plainToInstance} from 'class-transformer';
import { CreateUserDto } from '../dto/user/create.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/user/update.dto';
import { ReadUserDto } from '../dto/user/read.dto';



@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private repository: Repository<UserEntity>
    ) {
    }

    async create(payload?: any): Promise<any> {
        const newUser = this.repository.create(payload);
        return await this.repository.save(newUser);
    }

    async findAll(params?: any): Promise<any> {
        //All
        const response = await this.repository.findAndCount({
           // relations,
            order: {updatedAt: 'DESC'},
        });

        return {
            data: response[0],
            pagination: {totalItems: response[1], limit: 10},
        };
    }

    async findOne(id: string): Promise<UserEntity> {
        const user = await this.repository.findOne({
            where: {id},
            //relations: {roles: true, identificationType:true},
            select: {password: false},
        });

        if (!user) {
            throw new NotFoundException('Usuario no encontrado (find one)');
        }

        return user;
    }

    async update(id: string, payload: UpdateUserDto): Promise<UserEntity> {
        const user = await this.repository.preload({id, ...payload});

        if (!user) {
            throw new NotFoundException('Usuario no encontrado para actualizar');
        }

        this.repository.merge(user, payload);

        return await this.repository.save(user);
    }

    async remove(id: string): Promise<ReadUserDto> {
        const user = await this.repository.findOneBy({id});

        if (!user) {
            throw new NotFoundException('Usuario no encontrado para eliminar');
        }

        const userDeleted = await this.repository.softRemove(user);

        return plainToInstance(ReadUserDto, userDeleted);
    }
}