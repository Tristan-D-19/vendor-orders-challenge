
import VendorService from '../../services/vendor.service';
import { Request, Response } from 'express';


export class Controller {
  all(_: Request, res: Response): void {
    VendorService.all().then((r) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params['id'];
    VendorService.byId(id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }



  create(req: Request, res: Response): void {
    VendorService.create(req.body.name).then((r) =>
      res.status(201).location(`/vendors/vendor/${r.id}`).json(r)
    );
  }

}
  
export default new Controller();
