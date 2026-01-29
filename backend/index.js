const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const { authenticateToken, isAdmin } = require('./auth');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- AUTH ROUTES ---
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, 'user']
        );

        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
        } else {
            // Hardcoded check for initial setup as per frontend App.js
            if (email === "admin@restaurant.com" && password === "admin123") {
                 const token = jwt.sign(
                    { id: 0, email, role: 'admin' },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );
                return res.json({ token, user: { id: 0, email, role: 'admin' } });
            }
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: err.message });
    }
});

// --- DISH ROUTES ---
app.get('/api/dishes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM dishes');
        res.json(rows);
    } catch (err) {
        console.error("Error fetching dishes:", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/dishes', authenticateToken, isAdmin, async (req, res) => {
    const { name, price, description, image_url } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO dishes (name, price, description, image_url, rating) VALUES (?, ?, ?, ?, ?)',
            [name, price, description, image_url, 5]
        );
        res.status(201).json({ id: result.insertId, name, price, description, image_url, rating: 5 });
    } catch (err) {
        console.error("Error creating dish:", err);
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/dishes/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { name, price, description, image_url } = req.body;
    try {
        await pool.query(
            'UPDATE dishes SET name = ?, price = ?, description = ?, image_url = ? WHERE id = ?',
            [name, price, description, image_url, id]
        );
        res.json({ message: 'Dish updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/dishes/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM dishes WHERE id = ?', [id]);
        res.json({ message: 'Dish deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/dishes/:id/rate', async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
    try {
        await pool.query('UPDATE dishes SET rating = ? WHERE id = ?', [rating, id]);
        res.json({ message: 'Rating updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- OFFER ROUTES ---
app.get('/api/offers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM offers');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/offers', authenticateToken, isAdmin, async (req, res) => {
    const { content } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO offers (content) VALUES (?)', [content]);
        res.status(201).json({ id: result.insertId, content });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/offers/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM offers WHERE id = ?', [id]);
        res.json({ message: 'Offer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- MESSAGE ROUTES ---
app.get('/api/messages', authenticateToken, isAdmin, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/messages', async (req, res) => {
    const { text } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO messages (text) VALUES (?)', [text]);
        res.status(201).json({ id: result.insertId, text });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
