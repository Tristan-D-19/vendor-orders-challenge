import {v4 as uuid} from 'uuid'
import { PrismaClient } from '@prisma/client';
import {Vendor} from '../../common/types'
const prisma = new PrismaClient();

export class VendorService {
  
  async all(): Promise<Vendor[]> {
    return prisma.vendor.findMany();
  }

  async byId(id: string): Promise<Vendor | null> {

    return prisma.vendor.findUnique({
      where: { id: id }
    });
  }

  async byName(name: string): Promise<Vendor | null> {
    return prisma.vendor.findFirst({
      where: { name: name }
    });
  }

  async create(vendorInput: Omit<Vendor, 'id' >): Promise<Vendor> {
    const vendor = await prisma.vendor.create({
      data: {
        ...vendorInput,
        id: uuid(),
      }
    });
    return vendor;
  }
}

export default new VendorService();
