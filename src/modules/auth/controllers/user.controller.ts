import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { CreateUserDto } from '../dto/user/create.dto';
import { UserEntity } from '../entities/user.entity';
import { ResponseHttpModel } from 'src/shared/models/response-http.model';
import { LoginDto } from '../dto/auth/login.dto';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateUserDto): Promise<any> {
      const serviceResponse = await this.usersService.create(payload);
  
      return {
        data: serviceResponse,
        message: 'User created',
        title: 'Created',
      };
    }

    @Get()
    //@UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: any): Promise<any> {
      const serviceResponse = await this.usersService.findAll(params);
  
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Usuarios`,
        title: 'Lista de usuarios',
      };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
      const serviceResponse = await this.usersService.findOne(id);
  
      return {
        data: serviceResponse,
        message: `show ${id}`,
        title: `Success`,
      };
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: any): Promise<any> {
      const serviceResponse = await this.usersService.update(id, payload);
  
      return {
        data: serviceResponse,
        message: `User updated ${id}`,
        title: `Updated`,
      };
    }

    // @Delete(':id')
    // @HttpCode(HttpStatus.CREATED)
    // async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    //   const serviceResponse = await this.usersService.remove(id);
  
    //   return {
    //     data: serviceResponse,
    //     message: `Usuario eliminado`,
    //     title: `Eliminado`,
    //   };
    // }
}