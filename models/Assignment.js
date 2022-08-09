//assignment model

//---------------DEPENDENCIES AND GLOBAL VARIABLES----------------------
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


//--------------MODEL SPECIFIC METHODS---------------------------------------
class Assignment extends Model {}

//------------COLUMN DEFINITIONS--------------------------------------------

Assignment.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //date of assignment
        date: {
            //Date without time
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        completion_date: {
            //Date without time
            type: DataTypes.DATEONLY,
            //allow blank values (so it can be updated later upon completion)
            allowNull: true
        },
        //status column
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            //sets default value to open
            defaultValue: 'Open'
        },
        //note column
        note: {
            type: DataTypes.TEXT,
            //allow blank values (in case no note is needed upon completion)
            allowNull: true
        },
        //Task ID column
        task_id : {
            type: DataTypes.INTEGER,
            //foreign key references task id
            references: {
                model: 'task',
                key: 'id'
            }
        },
        //User ID column
        user_id : {
            type: DataTypes.INTEGER,
            //foreign key references assigned user id
            references: {
                model: 'user',
                key: 'id'
            }
        },
        //Nest ID column
        nest_id : {
            type: DataTypes.INTEGER,
            //foreign key references nest id
            references: {
                model: 'nest',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        //auto generate created_at and updated_at columns
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'assignment'
    }
)

module.exports = Assignment;