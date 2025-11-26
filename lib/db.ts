import Database from 'better-sqlite3';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

let db: Database.Database | null = null;

// Lazy initialization function
function getDatabase(): Database.Database {
  if (db) {
    return db;
  }

  try {
    // For serverless environments (like Vercel), use in-memory database
    // NOTE: In-memory database data is lost on each serverless function restart
    // For production with data persistence, consider using:
    // - Vercel Postgres
    // - Supabase
    // - PlanetScale
    // - Or another managed database service
    const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
    
    if (isServerless) {
      // Use in-memory database for serverless (data is not persistent)
      db = new Database(':memory:');
      console.log('Using in-memory database (serverless environment - data not persistent)');
    } else {
      // Use file-based database for local development
      const dataDir = path.join(process.cwd(), 'data');
      if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true });
      }
      const dbPath = path.join(dataDir, 'mekenet.db');
      db = new Database(dbPath);
      console.log('Using file-based database:', dbPath);
    }

    // Enable foreign keys
    db.pragma('foreign_keys = ON');

    // Initialize database schema
    initDatabase(db);
    
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    // Fallback to in-memory database if file-based fails
    if (!db) {
      db = new Database(':memory:');
      initDatabase(db);
    }
    return db;
  }
}

// Initialize database schema
function initDatabase(database: Database.Database) {
  try {
    // Users table
    database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        fullName TEXT NOT NULL,
        phone TEXT,
        accountNumber TEXT UNIQUE,
        role TEXT DEFAULT 'member',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes
    database.exec(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_accountNumber ON users(accountNumber);
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database schema:', error);
    throw error;
  }
}

// Export getter function instead of direct db instance
export default getDatabase;

