import { DataSource } from 'typeorm';

import { CoreRepositoryEnum } from 'src/shared/enums/repository.enums';
import { ClimateEntity } from '../entities/climate.entity';

export const coreProviders = [
  {
    provide: CoreRepositoryEnum.CLIMATE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ClimateEntity),
    inject: [DataSource],
  },
];
