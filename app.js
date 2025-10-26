import express from 'express';
import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';
import connectToDatabase from './database/mongodb.js';

const app = express();


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/properties', propertyRouter)


app.get('/', (req, res) => {
    res.send('Hello, PeakNest API!');
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    connectToDatabase();
})

export default app;
