const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
    try{
       let token = req.headers.authorization;
       
       if (!token &&token.startwith('Bearer')){
        token = token.split(' ')[1];    // Extract token
         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
         req.user = await User.findById(decoded.id).select('-password'); // Get user details without password
            next(); // Proceed to the next middleware or route handler
        
        } else {
            res.status(401).json({ message: 'Not authorized, no token' });
        }

    } catch (error) {
       res.status(401).json({ message: "Token failed", error: error.message }); 
    }
};
   module.exports = { protect };