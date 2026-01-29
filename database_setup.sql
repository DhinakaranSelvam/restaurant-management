CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dishes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(50) NOT NULL,
    description TEXT,
    image_url TEXT,
    rating INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS offers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed initial admin user (password is 'admin123' hashed with bcrypt)
-- You can use a tool to generate a hash or just use the hardcoded check in server.js for now.
-- INSERT INTO users (email, password, role) VALUES ('admin@restaurant.com', '$2a$10$YourHashedPasswordHere', 'admin');

-- Seed initial dishes
INSERT INTO dishes (name, price, description, image_url, rating) VALUES 
('Masala Dosa', '₹60', 'Crispy dosa with potato masala.', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976', 4),
('Idli Sambar', '₹40', 'Soft idlis with hot sambar.', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc', 5),
('Vegetable Pongal', '₹70', 'Traditional rice-lentil pongal.', 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2', 4),
('Veg Salad', '₹90', 'Fresh organic vegetable salad with lime dressing.', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', 5),
('Paneer Butter Masala', '₹120', 'Rich and creamy tomato-based cottage cheese curry.', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7', 5),
('Medu Vada', '₹45', 'Golden brown crispy lentil donuts served with chutney.', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc', 4),
('Lemon Rice', '₹55', 'Tangy and aromatic rice flavored with lemon and turmeric.', 'https://images.unsplash.com/photo-1512058564366-18510be2db19', 4),
('Apple Juice', '₹40', 'Freshly squeezed chilled apple juice.', 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0', 5);

-- Seed initial offers
INSERT INTO offers (content) VALUES 
('10% OFF on Dosa Combo'),
('Free Payasam above ₹300'),
('Weekend Veg Thali @ ₹99');
