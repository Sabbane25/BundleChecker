module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für mainboard
   */
  const mainboard = sequelize.define("mainboard", {
    artikelnummer: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'artikelnummer'
    },
    chipsatz: {
      type: Sequelize.STRING,
      field: 'chipsatz'
    },
    sockel: {
      type: Sequelize.STRING,
      field: 'sockel'
    },
    anzahlSpeichersockel: {
      type: Sequelize.INTEGER,
      field: 'anzahlSpeichersockel'
    },
    maxRam: {
      type: Sequelize.INTEGER,
      field: 'maxRam'
    },
    url: {
      type: Sequelize.STRING,
      field: 'url'
    },
    formFaktor: {
      type: Sequelize.STRING,
      field: 'formFaktor'
    },
    speicherTyp: {
      type: Sequelize.STRING,
      field: 'speicherTyp'
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'Mainboard'
  });

  return mainboard;
};
