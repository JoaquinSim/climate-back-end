import { Body, Controller, Get, Res, Post, Param } from '@nestjs/common';
import path = require('path');
import { PDFService } from '../service/pdf.service';

@Controller('pdf')
export class PDFController {
  constructor(private readonly pdfService: PDFService) {

  }
 
  @Get(':city')
  async downloadPDF(@Res() res , @Param('city') city: string): Promise<void> {
    const buffer = await this.pdfService.generarPDF(city);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })
    res.end(buffer);
  }

  @Get()
  async downloadTakesPDF(@Res() res): Promise<void> {
    const buffer = await this.pdfService.generartakePDF();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })
    res.end(buffer);
  }
}