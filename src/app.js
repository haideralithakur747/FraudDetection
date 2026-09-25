const express = require('express');

const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Fraud Detection API is running'
    });
});

// Authentication routes
app.use('/api/auth', authRoutes);

module.exports = app;