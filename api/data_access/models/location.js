'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('location', {
    latitude: DataTypes.DECIMAL(6,3),
    longitude: DataTypes.DECIMAL(6,3),
    address: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    _uuid: DataTypes.UUID
  }, {
    freezeTableName: true,
  });
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsToMany(models.user, { through: 'user_location' });
  };
  return Location;
};