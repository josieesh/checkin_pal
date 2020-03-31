'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('location', {
    id: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    address: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsToMany(User, { through: 'user_location' });
  };
  return Location;
};