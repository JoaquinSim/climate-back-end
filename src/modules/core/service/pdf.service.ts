import { Injectable } from '@nestjs/common';
import { ClimateService } from './climate.service';
const { PDFDocument } = require('pdfkit-table-ts');

@Injectable()
export class PDFService {
  constructor(private climateService: ClimateService) {}
  async generarPDF(city: string): Promise<Buffer> {
    const climates = (await this.climateService.findAll()).data;
    const citys = climates.find((climate) => {
      return (
        parseInt(JSON.stringify(climate.time).substr(10, 1)) ==
          new Date().getDate() && city == climate.city
      );
    });
    console.log(citys.city);

    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
        align: 'center',
      });

      doc
        .font('Helvetica-Bold')
        .fontSize(25)
        .text('Condiciones climaticas actuales', { align: 'center' }, 160);
      doc.font('Times-Bold', 13);
      doc.font('Times-Roman', 13).text(`Hoy`, 80, 280, { align: 'justify' });
      doc.text(`${citys.time}`);
      const rows_grades = [];
      const list = [citys.city, citys.temperature, citys.humidity, citys.pressure];
      rows_grades.push(list);

      const table = {
        headers: ['Ciudad', 'Temperatura', 'Humedad', 'Presion atmosferica'],
        rows: rows_grades,
      };

      await doc.table(table, { align: 'center', columnsSize: [40, 100, 40, 60, 60, 50, 50, 50] });
      
      doc.font('Times-Bold', 12).text('INSTITUTO YAVIRAC');


      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    return pdfBuffer;
  }

  async generartakePDF(): Promise<Buffer> {
    const climates = (await this.climateService.findAll()).data;

    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
        align: 'center',
      });

      doc
        .font('Helvetica-Bold')
        .fontSize(25)
        .text('Tomas meteorologicas', { align: 'center' }, 160);
      doc.font('Times-Bold', 13);
      doc.font('Times-Roman', 13).text(`Hoy`, 80, 280, { align: 'justify' });
      // doc.text(`${climates.time}`);
      const rows_grades = [];
      climates.forEach(element => {
        const list = [element.city, element.time, element.temperature, element.humidity, element.pressure];
        rows_grades.push(list);
      });


      const table = {
        headers: ['Ciudad', 'Fecha', 'Temperatura', 'Humedad', 'Presion atmosferica'],
        rows: rows_grades,
      };

      await doc.table(table, { align: 'center', columnsSize: [40, 100, 40, 60, 60, 50, 50, 50] });
      
      doc.font('Times-Bold', 12).text('INSTITUTO YAVIRAC');


      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    return pdfBuffer;
  }
}
