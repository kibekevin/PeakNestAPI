import { Router } from "express";


const authRouter = Router();

authRouter.post('/sign-up', (req, res) => res.send({title:'Sign-Up endpoint'}));
authRouter.post('/sign-in', (req, res) => res.send({title:'Sign-In endpoint'}));
authRouter.post('/sign-out', (req, res) => res.send({title:'Sign-Out endpoint'}));

export default authRouter;