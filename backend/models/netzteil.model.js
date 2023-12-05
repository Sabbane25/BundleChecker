module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für netzteil
   */
  const netzteil = sequelize.define("netzteil", {
    artikelnummer: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'artikelnummer'
    },
    bauform: {
      type: Sequelize.STRING,
      field: 'bauform'
    },
    url: {
      type: Sequelize.STRING,
      field: 'url'
    },
    zertifizierung: {
      type: Sequelize.STRING,
      field: 'zertifizierung'
    },
    leistung: {
      type: Sequelize.INTEGER,
      field: 'leistung'
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'Netzteil'
  });

  return netzteil;
};
