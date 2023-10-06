import L from '../../common/logger';
import { parse } from 'csv-parse';
import * as fs from 'fs';


export class FileService {
  async parseCSV (file: Express.Multer.File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const records: any[] = [];
      const parser = parse({ delimiter: ',' });

      const readStream = fs.createReadStream(file.path);
      readStream.pipe(parser);
      //if the file is readable then parse
      parser.on('readable', function() {
          let record;
          while ((record = parser.read()) !== null) {
             
            const item =
                 { modelNumber: record[0],
                  unitPrice: parseFloat(record[1]),
                  quantity: parseInt(record[2]), 
                  }
           
              records.push(item);
          }
      });

      parser.on('end', function() {
          L.info("records length ", records.length);
          records.shift(); //remove header row
          resolve(records);
      });

      parser.on('error', function(err) {
          console.error(err.message);
          reject(err); 
      });
  });
}

}

export default new FileService();
