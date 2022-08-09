//captures env variables
require('dotenv').config();

const sequelize = require('../config/connection');
const seedNest = require('./nestData');
const seedUser = require('./userData');
const seedTask = require('./taskData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedNest();

  await seedUser();

  await seedTask();

  process.exit(0);
};

seedAll();