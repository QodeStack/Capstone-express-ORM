import express from 'express';
import { pictureController } from '../controllers/picture.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';

const pictureRouter = express.Router();

// Tạo route CRUD
pictureRouter.post('/',protect, pictureController.create);
pictureRouter.get('/',protect, pictureController.findAll);
pictureRouter.get('/search',protect, pictureController.search);
pictureRouter.get('/detail/:id', protect,pictureController.detailById);
pictureRouter.get('/binhluan/:id',protect, pictureController.binhLuanById);
pictureRouter.get('/:id', pictureController.findOne);
pictureRouter.patch('/:id', pictureController.update);
pictureRouter.delete('/:id',protect, pictureController.remove);

export default pictureRouter;