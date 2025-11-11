import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', authorize ,getUserById);

userRouter.post('/', (req, res) => res.send({ title: 'Create new user endpoint' }));

userRouter.put('/:id', authorize ,updateUser);

userRouter.delete('/:id', authorize ,deleteUser);


export default userRouter;