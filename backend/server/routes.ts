import { Application } from 'express';
import ordersRouter from './api/controllers/orders/router'
import vendorsRouter from './api/controllers/vendors/router'
import filesRouter from './api/controllers/files/router'
export default function routes(app: Application): void {
  app.use('/api/v1/orders', ordersRouter);
  app.use('/api/v1/vendors', vendorsRouter);
  app.use('/api/v1/files', filesRouter);
}