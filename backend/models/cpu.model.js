module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für CPU
   */
  const cpu = sequelize.define("cpu", {
    artikelnummer: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'artikelnummer'
    },
    url: {
      type: Sequelize.STRING,
      field: 'url'
    },
    sockel: {
      type: Sequelize.STRING,
      field: 'sockel'
    },
    anzahlKerne: {
      type: Sequelize.INTEGER,
      field: 'anzahlKerne'
    },
    stromverbrauch: {
      type: Sequelize.INTEGER,
      field: 'stromverbrauch'
    },
    taktfrequenz: {
      type: Sequelize.STRING,
      field: 'taktfrequenz'
    },
    interneGrafik: {
      type: Sequelize.STRING,
      field: 'interneGrafik'
    },
    threads: {
      type: Sequelize.INTEGER,
      field: 'threads'
    },
    typ: {
      type: Sequelize.STRING,
      field: 'typ'
    },
    turbo: {
      type: Sequelize.INTEGER,
      field: 'Turbo'
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'CPU'
  });

  return cpu;
};
