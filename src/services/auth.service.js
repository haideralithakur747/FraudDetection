const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const registerUser = async (name, email, password, role = 'user') => {
    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    );

    return {
        user,
        token
    };
};

module.exports = {
    registerUser,
    loginUser
};