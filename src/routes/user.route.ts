import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services.ts/user.service';

const userRoute = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoute.get('/getuser', userController.getUser)

userRoute.post('/users', userController.registerUser);

export default userRoute;