const { Nest } = require('../models');

const nestData = [
    {
        nest_name: "Garfunkel's Place",
        street: "200 Grody Avenue",
        city: "Grubble",
        state: "AL",
        zip: "44444"
    },
    {
        nest_name: "The House of Jimmie",
        street: "14 Gonk Street",
        city: "Charlotte",
        state: "NC",
        zip: "28213"
    }
];

const seedNest = () => Nest.bulkCreate(nestData);

module.exports = seedNest;