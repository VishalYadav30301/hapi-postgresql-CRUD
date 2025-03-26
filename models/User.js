const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {

    name:{
        type: DataTypes.STRING,
        allowNull:false,

        validate:{
            notNull:{
              msg: 'Name is required'
            },
            notEmpty:{
                msg: 'Name cannot be empty'
            },
            len:{
                args:[3,30],
                msg: 'Name must be between 3 and 30 characters'
            }
        }

    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            notNull:{
                msg: 'Email is required'
            },
            notEmpty:{
                msg: 'Email cannot be empty'
            },
            isEmail:{
                msg: 'Please enter a valid email address'
            }
        }
    },

    age:{
        type:DataTypes.INTEGER,
        validate:{
            isInt:{
            msg: 'Age must be an integer'
            },
            min:{
                args: [18],
                msg: 'Age must be at least 18 years'
            },
            max:{
                args: [120],
                msg: 'Age must be at most 120 years'
            }
        }
    },
    
    phoneNo: {
        type: DataTypes.STRING, // Using STRING instead of numeric to preserve formatting
        validate: {
            is: {
                args: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                msg: 'Please enter a valid phone number'
            },
            len: {
                args: [10, 15], // Minimum 10 digits, maximum 15 with country code
                msg: 'Phone number must be between 10 and 15 characters'
            }
        }
    }
}, 
{
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
    
});

module.exports = User;
