import L from '../../common/logger';
import {v4 as uuid} from 'uuid'

interface Vendor {
  id: string;
  name: string,
  date: Date, 
  dateAdded: Date
}

//Temporary 
const vendors: Vendor[] = [
  { id: "d4c87334-68dd-4ddd-8cc6-897b6be11132" , name: 'Samsung',date: new Date(), dateAdded: new Date() },
  { id: "ac755c07-b54b-43e0-a9ce-67161f8e23bb" , name: 'Sony',  date: new Date(), dateAdded: new Date()}]

export class VendorService {
  all(): Promise<Vendor[]> {
    L.info(vendors, 'fetch all vendors');
    return Promise.resolve(vendors);
  }

  byId(id: number): Promise<Vendor> {
    L.info(`fetch Vendor with id ${id}`);
    return this.all().then((r) => r[id]);
  }

  byName(id: number): Promise<Vendor> {
    L.info(`fetch Vendor with id ${id}`);
    return this.all().then((r) => r[id]);
  }

  create(vendor: Vendor): Promise<Vendor> {
    L.info(`create new vendor: ${vendor}`);
    vendor.id = uuid();
    vendor.dateAdded = new Date();
    vendors.push(vendor);
    return Promise.resolve(vendor);
  }
}

export default new VendorService();