'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLocation = sequelize.define('user_location', {
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    timestamp: DataTypes.DATE
  }, {
    hooks: {
    },
    freezeTableName: true,
    timestamps: false
  });
  UserLocation.associate = function(models) {
    // associations can be defined here
  };
  return UserLocation;
};