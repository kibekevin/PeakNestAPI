import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';



const adminRole = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized'})
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const Admin = decoded.isAdmin

        if (Admin === false) {
            return res.status(403).json({ message: 'You are not an Admin' });
        }

        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}


export default adminRole;