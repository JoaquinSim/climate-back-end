import {DataSource} from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { AuthRepositoryEnum } from 'src/shared/enums/repository.enums';

export const authProviders = [
    {
        provide: AuthRepositoryEnum.USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: [DataSource],
    },
];