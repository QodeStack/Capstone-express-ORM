import express from 'express';
import { binhLuanController } from '../controllers/binhluan.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';

const binhluanRouter = express.Router();

// Tạo route CRUD
binhluanRouter.post('/',protect, binhLuanController.create);
binhluanRouter.get('/', binhLuanController.findAll);
binhluanRouter.get('/:id', binhLuanController.findOne);
binhluanRouter.patch('/:id', binhLuanController.update);
binhluanRouter.delete('/:id', binhLuanController.remove);

export default binhluanRouter;