const { hashPassword, verifyPassword } = require('./auth');
const fs = require('fs');
const path = require('path');

async function seedAdmin(db) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@smartfarming.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  try {
    const existing = await db.collection('users').findOne({ email: adminEmail });
    
    if (!existing) {
      const hashedPassword = hashPassword(adminPassword);
      await db.collection('users').insertOne({
        email: adminEmail,
        password_hash: hashedPassword,
        name: 'Admin',
        role: 'admin',
        created_at: new Date()
      });
      console.log('✅ Admin user created');
    } else if (!verifyPassword(adminPassword, existing.password_hash)) {
      const hashedPassword = hashPassword(adminPassword);
      await db.collection('users').updateOne(
        { email: adminEmail },
        { $set: { password_hash: hashedPassword } }
      );
      console.log('✅ Admin password updated');
    }
    
    const credentialsPath = path.join(__dirname, '../../memory/test_credentials.md');
    const credentialsDir = path.dirname(credentialsPath);
    
    if (!fs.existsSync(credentialsDir)) {
      fs.mkdirSync(credentialsDir, { recursive: true });
    }
    
    const credentialsContent = `# Test Credentials\n\n## Admin User\n- Email: ${adminEmail}\n- Password: ${adminPassword}\n- Role: admin\n\n## Auth Endpoints\n- POST /api/auth/register\n- POST /api/auth/login\n- POST /api/auth/logout\n- GET /api/auth/me\n`;
    
    fs.writeFileSync(credentialsPath, credentialsContent);
    console.log('✅ Test credentials saved');
    
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
}

module.exports = { seedAdmin };