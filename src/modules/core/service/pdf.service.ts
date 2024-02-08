import { Injectable } from '@nestjs/common';
import { ClimateService } from './climate.service';
const {PDFDocument} = require('pdfkit-table-ts');

@Injectable()
export class PDFService {
  constructor(private climateService: ClimateService) {}
  async generarPDF(city:string): Promise<Buffer> {
    const climates = (await this.climateService.findAll()).data;
    const citys = climates.find(climate => {
        return parseInt(JSON.stringify(climate.time).substr(10, 1)) == new Date().getDate() && city == climate.city
    });
    console.log(citys.city)

    const pdfBuffer: Buffer = await new Promise(resolve => {
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
        align: 'center',
      });

      doc.font('Helvetica-Bold').fontSize(25).text('Calificaciones de las Asignaturas', { align: 'center' }, 160);
      doc.font('Times-Bold', 13);
      doc
        .font('Times-Roman', 13)
        .text(
          `Ciudad`,
          80,
          280,
          { align: 'justify' },
        );

      const rows_grades = [];
      const list = [
        citys.city
      ];
      rows_grades.push(list);

      const table = {
        headers: [
          'Ciudad',
        ],
        rows: rows_grades,
      };

       doc.font('Times-Bold', 12).text('SECRETARÍA ACADÉMICA');
      //doc.table(table, { align: 'center', columnsSize: [40, 100, 40, 60, 60, 50, 50, 50] });
     doc.text(`${citys.city}`);

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