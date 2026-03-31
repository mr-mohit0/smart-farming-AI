const { getDB } = require('../config/database');
const { hashPassword, verifyPassword, createAccessToken, createRefreshToken } = require('../utils/auth');

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000;

async function register(req, res) {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const db = getDB();
    const normalizedEmail = email.toLowerCase().trim();
    
    const existing = await db.collection('users').findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const hashedPassword = hashPassword(password);
    
    const result = await db.collection('users').insertOne({
      email: normalizedEmail,
      password_hash: hashedPassword,
      name: name || 'Farmer',
      role: 'user',
      created_at: new Date()
    });
    
    const userId = result.insertedId.toString();
    const accessToken = createAccessToken(userId, normalizedEmail);
    const refreshToken = createRefreshToken(userId);
    
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
      path: '/'
    });
    
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    });
    
    res.status(201).json({
      _id: userId,
      email: normalizedEmail,
      name: name || 'Farmer',
      role: 'user'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const db = getDB();
    const normalizedEmail = email.toLowerCase().trim();
    const identifier = `${req.ip}:${normalizedEmail}`;
    
    const loginAttempt = await db.collection('login_attempts').findOne({ identifier });
    
    if (loginAttempt && loginAttempt.attempts >= MAX_LOGIN_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - loginAttempt.last_attempt.getTime();
      if (timeSinceLastAttempt < LOCKOUT_TIME) {
        const minutesLeft = Math.ceil((LOCKOUT_TIME - timeSinceLastAttempt) / 60000);
        return res.status(429).json({ 
          message: `Too many failed attempts. Please try again in ${minutesLeft} minutes` 
        });
      } else {
        await db.collection('login_attempts').deleteOne({ identifier });
      }
    }
    
    const user = await db.collection('users').findOne({ email: normalizedEmail });
    
    if (!user || !verifyPassword(password, user.password_hash)) {
      await db.collection('login_attempts').updateOne(
        { identifier },
        { 
          $inc: { attempts: 1 },
          $set: { last_attempt: new Date() }
        },
        { upsert: true }
      );
      
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    await db.collection('login_attempts').deleteOne({ identifier });
    
    const userId = user._id.toString();
    const accessToken = createAccessToken(userId, normalizedEmail);
    const refreshToken = createRefreshToken(userId);
    
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
      path: '/'
    });
    
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    });
    
    delete user.password_hash;
    user._id = userId;
    
    res.json(user);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
}

async function logout(req, res) {
  res.clearCookie('access_token', { path: '/' });
  res.clearCookie('refresh_token', { path: '/' });
  res.json({ message: 'Logged out successfully' });
}

async function getMe(req, res) {
  res.json(req.user);
}

module.exports = { register, login, logout, getMe };