module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für Nutzer
   *
   * @autor Mokhtar Yosofzay
   */
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'nutzer'
  });

  return User;
};
