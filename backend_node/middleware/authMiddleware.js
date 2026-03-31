const { verifyToken } = require('../utils/auth');
const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

async function authMiddleware(req, res, next) {
  try {
    let token = req.cookies.access_token;
    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    const payload = verifyToken(token);
    
    if (payload.type !== 'access') {
      return res.status(401).json({ message: 'Invalid token type' });
    }
    
    const db = getDB();
    const user = await db.collection('users').findOne({ _id: new ObjectId(payload.sub) });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    delete user.password_hash;
    user._id = user._id.toString();
    
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { authMiddleware };