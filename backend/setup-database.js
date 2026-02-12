const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
    let connection;
    
    try {
        // Connect to MySQL
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || ''
        });

        console.log('✅ Connected to MySQL');

        // Create Database
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE || 'bhavya_steel'}`);
        console.log('✅ Database created/verified');

        await connection.query(`USE ${process.env.MYSQL_DATABASE || 'bhavya_steel'}`);

        // Create Quotes Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS quotes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                company VARCHAR(255),
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                category VARCHAR(100) NOT NULL,
                quantity VARCHAR(100),
                products JSON,
                specifications TEXT NOT NULL,
                location VARCHAR(255) NOT NULL,
                required_date DATE,
                notes TEXT,
                status ENUM('pending', 'contacted', 'quoted', 'converted', 'rejected') DEFAULT 'pending',
                ip_address VARCHAR(50),
                user_agent TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                contacted_at TIMESTAMP NULL,
                quoted_at TIMESTAMP NULL,
                INDEX idx_email (email),
                INDEX idx_phone (phone),
                INDEX idx_status (status),
                INDEX idx_created (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Quotes table created');

        // Create Customers Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                company VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(50) NOT NULL,
                location VARCHAR(255),
                total_quotes INT DEFAULT 0,
                total_orders INT DEFAULT 0,
                total_value DECIMAL(15,2) DEFAULT 0,
                first_contact DATE,
                last_contact DATE,
                status ENUM('active', 'inactive', 'blacklisted') DEFAULT 'active',
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_phone (phone)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Customers table created');

        // Create Products Analytics Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS product_analytics (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_name VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                total_requests INT DEFAULT 0,
                total_conversions INT DEFAULT 0,
                last_requested DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY unique_product (product_name, category)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Product Analytics table created');

        // Create Admin Users Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role ENUM('admin', 'manager', 'viewer') DEFAULT 'viewer',
                is_active BOOLEAN DEFAULT TRUE,
                last_login TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Admin Users table created');

        // Create Activity Log Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS activity_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                action VARCHAR(100) NOT NULL,
                entity_type VARCHAR(50),
                entity_id INT,
                details JSON,
                ip_address VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_user (user_id),
                INDEX idx_action (action),
                INDEX idx_created (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Activity Log table created');

        console.log('\n╔════════════════════════════════════════════════════════════╗');
        console.log('║                                                            ║');
        console.log('║   ✅ DATABASE SETUP COMPLETED SUCCESSFULLY                 ║');
        console.log('║                                                            ║');
        console.log('║   Tables Created:                                          ║');
        console.log('║   • quotes                                                 ║');
        console.log('║   • customers                                              ║');
        console.log('║   • product_analytics                                      ║');
        console.log('║   • admin_users                                            ║');
        console.log('║   • activity_log                                           ║');
        console.log('║                                                            ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');

    } catch (error) {
        console.error('❌ Database Setup Error:', error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

setupDatabase();