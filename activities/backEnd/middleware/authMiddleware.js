import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Ensure next is a function
    if (typeof next !== 'function') {
        console.error("verifyToken middleware: next is not a function", typeof next);
        return res.status(500).json({ message: 'Middleware configuration error' });
    }
    
    try {
        const token = req.headers['authorization'];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        // Remove 'Bearer ' prefix if present
        const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
        
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        req.user = decoded;
        
        // Continue to the next middleware/route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};