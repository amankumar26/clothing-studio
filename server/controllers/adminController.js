import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Since this is a simple "one admin" project, we can use an environment variable for the admin.
// For more security, create an Admin model.
// Here we'll check against OWNER_EMAIL and a hardcoded ADMIN_PASSWORD or ENV password.

export const login = async (req, res) => {
  const { email, password } = req.body;

  // In a real project, you'd fetch this from the database.
  // We'll simulate it for now.
  const adminEmail = (process.env.ADMIN_EMAIL || process.env.OWNER_EMAIL || 'admin@brand.com').trim();
  const adminPass = (process.env.ADMIN_PASSWORD || 'admin123').trim();

  if (email.trim() === adminEmail && password === adminPass) {
    const token = jwt.sign(
      { email, role: 'admin' }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    res.json({ token, user: { email, role: 'admin' } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
