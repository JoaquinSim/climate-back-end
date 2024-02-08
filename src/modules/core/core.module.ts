import { Module } from '@nestjs/common';
import { coreProviders } from './providers/core.providers';
import { ClimateService } from './service/climate.service';
import { ClimateController } from './controllers/climate.controller';
import { PDFService } from './service/pdf.service';
import { PDFController } from './controllers/pdf.controller';

@Module({
  imports: [
  ],
  controllers:[ClimateController, PDFController],
  providers:[...coreProviders, ClimateService, PDFService],
  exports:[ ClimateService, PDFService]
})
export class CoreModule {}
