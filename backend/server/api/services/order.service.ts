import {v4 as uuid, v4} from 'uuid'
import {Order, Product} from '../../common/types'
import {  PrismaClient}  from '@prisma/client';
import vendorService from './vendor.service';


const prisma = new PrismaClient();

export class OrderService {
  all(): Promise<Order[]> {
    return prisma.order.findMany();
  }

  byId(id: string): Promise<Order | null> {

    return prisma.order.findUnique({ where: { id },
      include: {
        products: true,
        vendorRef: true,
    } });
  }

  async byVendor(vendorName: string): Promise<Order[]> {
    return prisma.order.findMany({
      where: {
        vendor: vendorName,
        
      }
    });
  }


  async create(orderData: Omit<Order, 'id' | 'dateAdded'>): Promise<Order> {
    return new Promise(async (resolve, reject) => {
   try{
       const vendor = await vendorService.create({name: orderData.vendor})
   const newOrder = {
     ...orderData,
     id: uuid(),
     vendorId: vendor.id,
     dateAdded: new Date(),
     products: {
       create: orderData.products?.map((product: Product) => ({
         ...product,
         id: uuid(),
       })),
     },
   };

   const createdOrder = await prisma.order.create({
     data: newOrder,
     include: {
       products: true,
     },
   });
   return resolve(createdOrder);

   }catch(error: any){
    reject("error creating order: " + error);

   }
});
}


  
}

export default new OrderService();
