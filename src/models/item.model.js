const Sequelize = require("sequelize");
const db = require('./db');

const Item = db.define("item", {
    title: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE  
    }
});

Item.sync().then(() => {
    console.log("Drop and re-sync db.");
});

module.exports = Item;