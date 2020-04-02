'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('location', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true },
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    address: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {
    freezeTableName: true,
  });
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsToMany(models.user, { through: 'user_location' });
  };
  return Location;
};