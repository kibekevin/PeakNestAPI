import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';


export const signUp = async (req, res, next) => {
    try {
        // Extract user details from request body
        const { name, email, password } = req.body

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.status = 409; // Conflict
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});


        // Send response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUser,
                token
            }
        })

    } catch (error) {
        next(error);
    }
}



export const signIn = async (req, res, next) => {
    try {
        // Extract credentials from request body
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            const error = new Error('Invalid email or password');
            error.status = 401; // Unauthorized
            throw error;
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error = new Error('Invalid email or password');
            error.status = 401; // Unauthorized
            throw error;
        }

        const userInfo = {
            username: user.name,
            userEmail: user.email,
            userId: user._id,
            avatar: user.avatar,
            createdAt: user.createdAt
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        // Save token in cookie
        res.cookie("token", token, {
            httpOnly: true,      // not accessible via JS
            secure: false,  // only send over HTTPS in production, if set to true
            //sameSite: "Strict",  // prevent CSRF
            maxAge: 24 * 60 * 60 * 1000  // 1 day
        })

        // Send response
        res.status(200).json({
            success: true,
            message: 'Sign-in successful',
            data: {
                userInfo,
                token
            }
        })
    } catch (error) {
        next(error);
    }
}




export const signOut = async (req, res, next) => {
    try {
        // Sign-out logic
        //res.clearCookie("token").status(200).json({ message: 'Logged Out Successfully' })
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            //sameSite: "Strict"
        });

        res.status(200).json({
            success: true,
            message: "Sign-out successful"
        });
    } catch (error) {
        next(error);
    }
}