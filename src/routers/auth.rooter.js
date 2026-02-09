import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';


const authRouter = express.Router();

// Tạo route CRUD
authRouter.post('/', authController.create);
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/getInfo',protect,authController.getInfo);
authRouter.get('/refreshToken',authController.refreshToken);




authRouter.get('/', authController.findAll);
authRouter.get('/:id', authController.findOne);
authRouter.patch('/:id', authController.update);
authRouter.delete('/:id', authController.remove);

export default authRouter;