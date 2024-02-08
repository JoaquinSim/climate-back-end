import { Exclude, Expose } from 'class-transformer';
import { ClimateDto } from './climate.dto';

@Exclude()
export class ReadClimateDto extends ClimateDto {
  @Expose()
  readonly id;

  @Expose()
  readonly temperature;

  @Expose()
  readonly presion;

  @Expose()
  readonly velocity;

  @Expose()
  readonly humidity;
}