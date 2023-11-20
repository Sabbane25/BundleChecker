module.exports = (sequelize, Sequelize) => {
  /**
   * Modell für Nutzer
   */
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'nutzer'
  });

  return User;
};
