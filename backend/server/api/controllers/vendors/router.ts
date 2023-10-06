import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/vendors', controller.create)
  .get('/vendors', controller.all)
  .get('/vendor/:id', controller.byId);