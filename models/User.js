//user model

//---------------DEPENDENCIES AND GLOBAL VARIABLES----------------------
const bcrypt = require('bcrypt');
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


//--------------MODEL SPECIFIC METHODS---------------------------------------
class User extends Model {

    //method to check password
    async checkPassword(loginPw) {
        return await bcrypt.compare(loginPw, this.password);
    }

}

//------------COLUMN DEFINITIONS--------------------------------------------

User.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            //each username must be unique
            unique: true
        },
        //email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //each email must be unique
            unique: true,
            //validate data to make sure it's an email address
            validate: {
                isEmail: true
            }
        },
        //password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            //password must at least 8 chars long
            validate: {
                len: [8]
            }
        },
        //first name column
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //last name column
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //role column
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            //role defaults to Nestmate until changed
            defaultValue: 'Nestmate'
        },
        //nest id column (for showing which nest a user belongs to)
        nest_id: {
            type: DataTypes.INTEGER,
            //can be null (a user can belong to no nests)
            allowNull: true,
            //foreign key references Nest
            references: {
                model: 'nest',
                key: 'id'
            }
        }
    },
    {
        //enable hooks, functions that are called whenever data is manipulated in this table
        hooks : {
            //runs before a user is created in the db and hashes their PW
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            // runs when a user is updated, requires { individualHooks: true } to be added to the function that handles the update in the PUT route
            // if the request contains a .password property, re-hash the password. Otherwise don't.
            async beforeUpdate(updatedUserData) {
                if (updatedUserData.changed('password')) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                    return updatedUserData;
                } else {
                    return updatedUserData;
                }
                
            }
        },
        sequelize,
        //auto generate created_at and updated_at columns
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User;