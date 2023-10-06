import L from '../../common/logger';
import {v4 as uuid} from 'uuid'

interface Order {
  id: string;
  modelNumber: string,
  unitPrice: number,
  quantity: number,
  date: Date,
  dateAdded: Date
}

//Temporary 
const orders: Order[] = [
  { id: "68fa6fa7-0a86-4d66-a9d9-78209a86a1a7" , modelNumber: 'sdfsdfj303', quantity: 100, unitPrice: 240.34, date: new Date(), dateAdded: new Date() },
  { id: "328467f4-f200-4c26-83d5-8e5bc5261ecb" , modelNumber: 'sdfsdfj303', quantity: 100, unitPrice: 240.34, date: new Date(), dateAdded: new Date() },
];

export class OrderService {
  all(): Promise<Order[]> {
    L.info(orders, 'fetch all orders');
    return Promise.resolve(orders);
  }

  byId(id: number): Promise<Order> {
    L.info(`fetch example with id ${id}`);
    return this.all().then((r) => r[id]);
  }

  create(order: Order): Promise<Order> {
    L.info(`create new order: ${order}`);
    order.id = uuid();
    order.dateAdded = new Date();
    orders.push(order);
    return Promise.resolve(order);
  }
}

export default new OrderService();