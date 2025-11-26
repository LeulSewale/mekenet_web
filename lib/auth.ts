import bcrypt from 'bcryptjs';
import db from './db';

export interface User {
  id: number;
  email: string;
  fullName: string;
  phone?: string;
  accountNumber?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  accountNumber?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function createUser(input: CreateUserInput): User {
  const { email, password, fullName, phone, accountNumber } = input;
  
  // Check if user already exists
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ? OR accountNumber = ?').get(email, accountNumber || '');
  if (existingUser) {
    throw new Error('User with this email or account number already exists');
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Insert user
  const result = db.prepare(`
    INSERT INTO users (email, password, fullName, phone, accountNumber)
    VALUES (?, ?, ?, ?, ?)
  `).run(email, hashedPassword, fullName, phone || null, accountNumber || null);

  // Get created user (without password)
  const user = db.prepare('SELECT id, email, fullName, phone, accountNumber, role, createdAt, updatedAt FROM users WHERE id = ?').get(result.lastInsertRowid) as User;
  
  return user;
}

export function getUserByEmail(email: string): (User & { password: string }) | null {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as (User & { password: string }) | undefined;
  return user || null;
}

export function getUserById(id: number): User | null {
  const user = db.prepare('SELECT id, email, fullName, phone, accountNumber, role, createdAt, updatedAt FROM users WHERE id = ?').get(id) as User | undefined;
  return user || null;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = getUserByEmail(email);
  
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);
  
  if (!isValid) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

