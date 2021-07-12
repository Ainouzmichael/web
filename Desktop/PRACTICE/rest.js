const { sequelize, DataTypes, Model } = require('./data');

class Restaurant extends Model {

}
class Menu extends Model {

}
class Item extends Model {

}

Restaurant.init({
    name: DataTypes.STRING,

}, {
    sequelize,
    timestamps: false
});


Menu.init({
    name: DataTypes.STRING,

}, {
    sequelize,
    timestamps: false
});

Item.init({
    name: DataTypes.STRING,

}, {
    sequelize,
    timestamps: false
});

Item.belongsTo(Menu)
Menu.hasMany(Item)

Menu.belongsTo(Restaurant)
Restaurant.hasMany(Menu)

module.exports = { Restaurant, Menu, Item };