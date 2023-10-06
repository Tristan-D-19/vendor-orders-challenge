import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/checkout', controller.create)
  .get('/orders', controller.all)
  .get('/order/:id', controller.byId);