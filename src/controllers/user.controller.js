const User = require('../models/user.model');

// GET /api/users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.error('Get users error:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to fetch users'
        });
    }
};

module.exports = {
    getAllUsers
};