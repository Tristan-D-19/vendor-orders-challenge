import express from 'express';
import controller from './controller';
import fileHandler from '../../middlewares/file.handler';

export default express
  .Router()
  .post('/', fileHandler().single('file'), controller.create)
  .get('/', controller.all)
  .get('/order/:id', controller.byId);
