const express = require('express');

const User = require('./models/user.model');

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Fraud Detection API is running'
    });
});

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            message: 'User created successfully',
            user
        });

    } catch (error) {
        console.error('Error creating user:', error);

        res.status(500).json({
            message: 'Failed to create user',
            error: error.message
        });
    }
});

module.exports = app;