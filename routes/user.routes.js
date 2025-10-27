import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', authorize ,getUserById);

userRouter.post('/', (req, res) => res.send({ title: 'Create new user endpoint' }));

userRouter.put('/:id', (req, res) => res.send({ title: 'Update user by ID endpoint' }));

userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete user by ID endpoint' }));


export default userRouter;