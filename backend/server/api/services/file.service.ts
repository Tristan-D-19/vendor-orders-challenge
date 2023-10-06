import L from '../../common/logger';
// import { parse } from 'csv-parse';
import * as fs from 'fs';




export class FileService {
  async parseCSV (file: Express.Multer.File): Promise<any[]> {
    return Promise.resolve([file]);
}

}

export default new FileService();