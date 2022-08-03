//Model for Nest (Household)


//---------------DEPENDENCIES AND GLOBAL VARIABLES----------------------
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


//--------------MODEL SPECIFIC METHODS---------------------------------------
class Nest extends Model {}

//------------COLUMN DEFINITIONS--------------------------------------------

Nest.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //nest name column
        nest_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //street address column
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //city column
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //State column
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //must be only 2 chars long, eg. "NC"
                len: [2,2]
            }
        },
        //Zip Code column
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //must be only 5 chars long, eg. "28214"
                len: [5,5],
                //string can only have numbers
                isNumeric: true
            }
        },
        //shareable ID
        share_id: {
            type: DataTypes.UUID,
            allowNull: false,
            //generates a unique ID
            defaultValue: DataTypes.UUIDV4
        },
    },
    {
        sequelize,
        //auto generate created_at and updated_at columns
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'nest'
    }
)

module.exports = Nest;