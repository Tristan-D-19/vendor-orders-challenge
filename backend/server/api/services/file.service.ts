import L from '../../common/logger';
// import { parse } from 'csv-parse';
import * as fs from 'fs';


type File = {
    path: fs.PathLike
  }


export class FileService {
  async parseCSV (file: string): Promise<any[]> {
    return Promise.resolve([file]);
}

}

export default new FileService();