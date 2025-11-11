import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';


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





export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const tokenUserId = req.user._id.toString()
    const { password, avatar, ...inputs } = req.body

    if (id !== tokenUserId) {
        //console.log(id)
        //console.log(tokenUserId)
        return res.status(403).json({message: 'Not Authorized to update profile'})
    }

    // Prevent updates to sensitive fields
    const forbiddenFields = ['_id', 'isAdmin', 'createdAt', 'updatedAt'];
    forbiddenFields.forEach(field => delete inputs[field]);
    
    let updatedPassword = null;

    try {
        // update password logic
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10)
        }
        //update user logic
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {   ...inputs,
                ...(updatedPassword && {password: updatedPassword}),
                ...(avatar && {avatar})
            },
            {new: true}
        )

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }


        const userInfo = {
            username: updatedUser.name,
            userEmail: updatedUser.email,
            userId: updatedUser._id,
            avatar: updatedUser.avatar,
            //password: updatedUser.password,
            createdAt: updatedUser.createdAt
        }


        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: {
                userInfo,
            }
        })

        
    } catch (error) {
        next(error)
    }
}




export const deleteUser = async (req, res, next) => {

    const id = req.params.id;
    const tokenUserId = req.user._id.toString()

    if (id !== tokenUserId) {
        //console.log(id)
        //console.log(tokenUserId)
        return res.status(403).json({message: 'Not Authorized to delete profile'})
    }

    try {
        //delete user logic
        await User.findByIdAndDelete(id)

        res.status(200).json({message: 'User deleted successfully'})
    } catch (error) {
        next(error)
    }
}