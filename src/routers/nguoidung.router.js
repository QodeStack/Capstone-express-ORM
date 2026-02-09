import express from 'express';
import { nguoiDungController } from '../controllers/nguoidung.controller.js';

const nguoiDungRouter = express.Router();

// Tạo route CRUD
nguoiDungRouter.post('/', nguoiDungController.create);
nguoiDungRouter.get('/', nguoiDungController.findAll);
nguoiDungRouter.get('/list-pic-create/:id', nguoiDungController.listCreate);
nguoiDungRouter.get('/list-pic-save/:id', nguoiDungController.listSave);
nguoiDungRouter.get('/:id', nguoiDungController.findOne);
nguoiDungRouter.patch('/:id', nguoiDungController.update);
nguoiDungRouter.delete('/:id', nguoiDungController.remove);

export default nguoiDungRouter;