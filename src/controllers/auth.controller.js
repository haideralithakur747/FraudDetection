const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email and password are required'
            });
        }

        const user = await authService.registerUser(
            name,
            email,
            password,
            role
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);

        res.status(400).json({
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const result = await authService.loginUser(email, password);

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role
            },
            token: result.token
        });

    } catch (error) {
        console.error('Login error:', error);

        res.status(401).json({
            message: error.message
        });
    }
};
const profile = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Profile accessed successfully',
            user: req.user
        });
    } catch (error) {
        console.error('Profile error:', error);

        res.status(500).json({
            message: 'Failed to access profile'
        });
    }
};
module.exports = {
    register,
    login,
    profile
};