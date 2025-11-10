import { Router } from "express";
import { shouldBeLoggedIn, shouldBeAdmin } from "../controllers/test.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import adminRole from "../middlewares/admin.middleware.js";


const testRouter = Router();

testRouter.get('/should-be-logged-in', authorize , shouldBeLoggedIn);
testRouter.get('/should-be-admin', authorize ,adminRole, shouldBeAdmin);


export default testRouter;