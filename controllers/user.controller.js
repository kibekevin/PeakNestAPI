import User from '../models/user.model.js';


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        if (!users) {
            const error = new Error('No users found');
            error.status = 404; // Not Found
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: { users }
        })
    } catch (error) {
        next(error);
    }
}



export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.status = 404; // Not Founf
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: { user }
        })
    } catch (error) {
        next(error);
    }
}