import { PickType } from '@nestjs/swagger';
import { ClimateDto } from './climate.dto';

export class CreateClimateDto extends PickType(ClimateDto, [
'city',
'temperature',
'humidity',
'velocity',
'pressure',
'volumen',
'time'
]) {}
