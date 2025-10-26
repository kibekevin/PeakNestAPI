import { Router } from "express";


const userRouter = Router();

userRouter.get('/', (req, res) => res.send({ title: 'Get all users endpoint' }));

userRouter.get('/:id', (req, res) => res.send({ title: 'Get user by ID endpoint' }));

userRouter.post('/', (req, res) => res.send({ title: 'Create new user endpoint' }));

userRouter.put('/:id', (req, res) => res.send({ title: 'Update user by ID endpoint' }));

userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete user by ID endpoint' }));


export default userRouter;