const app = require('./app');
const sequelize = require('../db');
const User = require('./models/user.model');

const PORT = 3000;

sequelize.sync()
    .then(() => {
        console.log('Database tables synchronized');

        app.listen(PORT, () => {
            console.log(`Fraud Detection server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database synchronization failed:', error);
    });