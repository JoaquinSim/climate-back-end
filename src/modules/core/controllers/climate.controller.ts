import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClimateService } from '../service/climate.service';
import { CreateClimateDto } from '../dto/climate/create.climate.dto';
import { ResponseHttpModel } from 'src/shared/models/response-http.model';


@Controller('climate')
export class ClimateController {
    constructor(private usersService: ClimateService) {
      this.createAuto()
    }
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateClimateDto): Promise<any> {
      const serviceResponse = await this.usersService.create(payload);
  
      return {
        data: serviceResponse,
        message: 'User created',
        title: 'Created',
      };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createAuto(): Promise<any> {
      const serviceResponse = await this.usersService.findPosition();

      return {
        data: serviceResponse,
        message: 'Datos de clima created',
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

    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
      const serviceResponse = await this.usersService.remove(id);
  
      return {
        data: serviceResponse,
        message: `Usuario eliminado`,
        title: `Eliminado`,
      };
    }
}