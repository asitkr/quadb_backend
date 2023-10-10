const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const User = sequelize.define('Users', {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_image: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    total_orders: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    last_logged_in: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

module.exports = User;