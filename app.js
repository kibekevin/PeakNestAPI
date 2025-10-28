import express from 'express';
import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import listingRouter from './routes/listing.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import ArcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(ArcjetMiddleware);

//Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/listings', listingRouter)

//Error middleware
app.use(errorMiddleware);

//Test route
app.get('/', (req, res) => {
    res.send('Hello, PeakNest API!');
})

//Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    connectToDatabase();
})

export default app;
