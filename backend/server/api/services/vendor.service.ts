import {v4 as uuid} from 'uuid'
import { PrismaClient } from '@prisma/client';
import {Vendor} from '../../common/types'
const prisma = new PrismaClient();

export class VendorService {

  async all(): Promise<Vendor[]> {

    try{
      return prisma.vendor.findMany();
    }catch(error : any){
      console.error("error fetching all vendors: ", error);
      return [];
    }
  }

  async byId(id: string): Promise<Vendor | null> {
try{
  return prisma.vendor.findUnique({
    where: { id: id }
  });
}catch(error : any){
  console.error("error fetching by id: ", error);
  return null;
}
  }

  async byName(name: string): Promise<Vendor | null> {
    try{
      return prisma.vendor.findFirst({
        where: { name: name }
      });

    }catch(error : any){
      console.error("error fetching by name: ", error);
      return null;
    }
  }

  async create(vendorInput: Omit<Vendor, 'id' >): Promise<Vendor| null> {
    try{
      const vendor = await prisma.vendor.create({
        data: {
          ...vendorInput,
          id: uuid(),
        }
      });
      return vendor;

    }catch(error : any){
      console.error("error creating new vendor: ", error);
      return null;
    }
  }

}

export default new VendorService();
