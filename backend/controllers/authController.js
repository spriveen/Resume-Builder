const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({id: userId }, process.env.SECRET_KEY, {expiresIn:"7d"});
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    try {
        const {name, email, password, profileImageUrl} = req.body;
        
        // Check if user already exists
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        });
        
        // Return user data with JWT
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Authenticate user & get token
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Return user data with JWT
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Get user Profile
// @route GET /api/auth/profile
// @access Private (Requires JWT)
const getUserProfile = async (req, res) => {
    try {
        // req.user is set by the auth middleware after verifying JWT
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };