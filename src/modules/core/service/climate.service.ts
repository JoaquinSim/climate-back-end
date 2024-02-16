import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, LessThan, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ClimateEntity } from '../entities/climate.entity';
import { CreateClimateDto } from '../dto/climate/create.climate.dto';
import { ReadClimateDto } from '../dto/climate/read.climate.dto';
import { UpdateClimateDto } from '../dto/climate/update.climate.dto';
import { auto } from '../controllers/climate.controller';

@Injectable()
export class ClimateService {
  API_KEY = '28c9a369f132111726aaa6aa34268128';
  constructor(
    @Inject('CLIMATE_REPOSITORY')
    private repository: Repository<ClimateEntity>,
  ) {}

  async create(payload: CreateClimateDto): Promise<ClimateEntity> {
    const newUser = this.repository.create(payload);
    return await this.repository.save(newUser);
  }

  async findAll(params?: any): Promise<any> {
    const response = await this.repository.findAndCount({
      order: { createdAt: 'DESC' },
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ClimateEntity> {
    const user = await this.repository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Datos del clima no encontrados (find one)');
    }

    return user;
  }

  async update(id: string, payload: UpdateClimateDto): Promise<ClimateEntity> {
    const user = await this.repository.preload({ id, ...payload });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado para actualizar');
    }

    this.repository.merge(user, payload);

    return await this.repository.save(user);
  }

  async remove(id: string): Promise<ReadClimateDto> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado para eliminar');
    }

    const userDeleted = await this.repository.softRemove(user);

    return plainToInstance(ReadClimateDto, userDeleted);
  }

  takeDataAuto(activate: auto) {
    if(activate.activate === true){
      console.log('Funcion automatica habilitada')

      fetch(
        `    https://api.openweathermap.org/data/2.5/weather?q=${'Quito'}&appid=${
          this.API_KEY
        }`,
      )
        .then((response) => response.json())
        .then((data) => {
          setInterval(() => {
            const climate = {
              city: data.name,
              temperature: data.main.temp - 273.15,
              humidity: data.main.humidity,
              velocity: data.wind.speed,
              time: new Date(),
              pressure: data.main.pressure,
              volumen: data.rain,
            };
            if (climate.volumen == undefined) {
              climate.volumen = 0.0;
            } else {
              climate.volumen = parseFloat(
                JSON.stringify(data.rain).substr(6, 10),
              );
            }
            this.takeData(climate);
          }, 45000000);
        });
  
      fetch(
        `    https://api.openweathermap.org/data/2.5/weather?q=${'Cuenca'}&appid=${
          this.API_KEY
        }`,
      )
        .then((response) => response.json())
        .then((data) => {
          setInterval(() => {
            const climate = {
              city: data.name,
              temperature: data.main.temp - 273.15,
              humidity: data.main.humidity,
              velocity: data.wind.speed,
              time: new Date(),
              pressure: data.main.pressure,
              volumen: data.rain,
            };
            if (climate.volumen == undefined) {
              climate.volumen = 0.0;
            } else {
              climate.volumen = parseFloat(
                JSON.stringify(data.rain).substr(6, 10),
              );
            }
            this.takeData(climate);
          }, 45000000);
        });
  
      fetch(
        `    https://api.openweathermap.org/data/2.5/weather?q=${'Guayaquil'}&appid=${
          this.API_KEY
        }`,
      )
        .then((response) => response.json())
        .then((data) => {
          setInterval(() => {
            const climate = {
              city: data.name,
              temperature: data.main.temp - 273.15,
              humidity: data.main.humidity,
              velocity: data.wind.speed,
              time: new Date(),
              pressure: data.main.pressure,
              volumen: data.rain,
            };
            if (climate.volumen == undefined) {
              climate.volumen = 0.0;
            } else {
              climate.volumen = parseFloat(
                JSON.stringify(data.rain).substr(6, 10),
              );
            }
            this.takeData(climate);
          }, 45000000);
        });
    }else{
      console.log('Funcion automatica deshabilitada')
    }
  }

  takeData(time: CreateClimateDto) {
    this.create(time);
  }
}
