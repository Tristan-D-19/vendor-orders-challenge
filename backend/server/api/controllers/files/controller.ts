import { Request, Response } from 'express';
import fileService from '../../services/file.service';

export class Controller {

  async upload(req: Request, res: Response): Promise<void> {
    const file:any= req.file; //need to set up a type for this

    if (!file) {
     const parsedRecords = await fileService.parseCSV(file.path)
      res.send(200).json(parsedRecords)
}
  }
}

export default new Controller();