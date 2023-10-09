
import { Vendor } from '@prisma/client';
import VendorService from '../../services/vendor.service';
import { Request, Response } from 'express';
import { error } from 'console';


export class Controller {
  all(_: Request, res: Response): void {
    VendorService.all().then((r) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params['id'];
    VendorService.byId(id).then((r: Vendor| null) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }



  create(req: Request, res: Response): void {
    VendorService.create(req.body.name).then((r) =>
   { if(r != null)
      res.status(201).location(`/vendors/vendor/${r.id}`).json(r)}
    ).catch((error: any)=> {
      console.error("error getting new vendor: ", error)
    });
  }

}

export default new Controller();
