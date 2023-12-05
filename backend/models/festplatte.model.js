module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für festplatte
   */
  const festplatte = sequelize.define("festplatte", {
    artikelnummer: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'artikelnummer'
    },
    url: {
      type: Sequelize.STRING,
      field: 'url'
    },
    typ: {
      type: Sequelize.STRING,
      field: 'typ'
    },
    kapazitaet: {
      type: Sequelize.STRING,
      field: 'kapazitaet'
    },
    lesen: {
      type: Sequelize.INTEGER,
      field: 'lesen'
    },
    schreiben: {
      type: Sequelize.INTEGER,
      field: 'schreiben'
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'Festplatte'
  });

  return festplatte;
};
