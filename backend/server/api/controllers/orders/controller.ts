import orderService from '../../services/order.service';
import fileService from '../../services/file.service';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Order } from '../../../common/types';
export class Controller {
  all(_: Request, res: Response): void {
    orderService.all().then((r) => res.json(r));
  }



  byId(req: Request, res: Response): void {
    const id = req.params['id'];
    orderService.byId(id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  async create(req: Request, res: Response): Promise<void> {
    interface OrderData {
      vendor: string,
      date: Date,
    }
    let parsedData: OrderData = req.body;
    let order: Order = {
      id: uuid(),
      vendor: parsedData.vendor,
      date: parsedData.date,
      dateAdded: new Date()
    }
  
    if(req.file != undefined){
       order.products = await fileService.parseCSV(req.file);

    }
    orderService.create(order).then((r) =>
      res.status(201).location(`/orders/order/${r.id}`).json(r)
    ).catch;
  }

}
  
export default new Controller();
