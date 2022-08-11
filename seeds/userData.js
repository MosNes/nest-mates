const { User } = require('../models');

const userData = [
    {
        username: "Garf22",
        email: "garf@gmail.com",
        password: "garfdaybarfday",
        first_name: "Harold",
        last_name: "Garfunkel"
    },
    {
        username: "jimbo4000",
        email: "jimmy4lyfe@gmail.com",
        password: "rustlinmyjimmies",
        first_name: "Jimmie",
        last_name: "Horgle"
    },
    {
        username: "beefo",
        email: "beefburgh@gmail.com",
        password: "toenailhammer33",
        first_name: "Beef",
        last_name: "Boseman"
    },
    {
        username: "murkl",
        email: "murkyboi@gmail.com",
        password: "stareIntoTheAbyss",
        first_name: "Claude",
        last_name: "Merkle"
    },
    {
        username: "misstake",
        email: "accidentalMillionaire@gmail.com",
        password: "spanakopita",
        first_name: "Francine",
        last_name: "Kibble"
    },
    {
        username: "noble420",
        email: "blazeit@gmail.com",
        password: "cannibiscannibal",
        first_name: "Mordecai",
        last_name: "Montague"
    },
    {
        username: "fweeb",
        email: "weeblbleeb@gmail.com",
        password: "animewasamistake",
        first_name: "Sousuke",
        last_name: "WithTheMosuke"
    }
];

const seedUser = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUser;