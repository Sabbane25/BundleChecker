module.exports = (sequelize, Sequelize) => {
  /**
   * Model für Nutzer-Rolle
   *
   * @autor Mokhtar Yosofzay
   */
  const Role = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'nutzer_rollen'
  });

  return Role;
};
