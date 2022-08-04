//Tasks model

//---------------DEPENDENCIES AND GLOBAL VARIABLES----------------------
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


//--------------MODEL SPECIFIC METHODS---------------------------------------
class Task extends Model {}

//------------COLUMN DEFINITIONS--------------------------------------------

Task.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //Task Name column
        task_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //Task Description column
        task_description: {
            type: DataTypes.TEXT,
            //allow no description
            allowNull: true
        },
        //Nest Id
        nest_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            //foreign key references Nest
            references: {
                model: 'nest',
                key: 'id'
            }
        },
        //Recurs column (how often the task needs to be performed)
        // daily, weekly, monthly
        recurs: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isRecur(value) {
                    if (value !== 'daily'
                    || value !== 'weekly'
                    || value !== 'monthly'
                    ) {
                        throw new Error('Invalid recurs value: Recurring period must be daily, weekly, or monthly.');
                    }
                }
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task'
    }
)

module.exports = Task;