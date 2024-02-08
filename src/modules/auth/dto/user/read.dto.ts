import { Exclude, Expose } from 'class-transformer';
import { UserDto } from './user.dto';

@Exclude()
export class ReadUserDto extends UserDto {
  @Expose()
  readonly id;

  @Expose()
  readonly email;

  @Expose()
  readonly lastname;

  @Expose()
  readonly name;
}