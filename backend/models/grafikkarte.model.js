module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für grafikkarte
   *
   * @autor Mokhtar Yosofzay
   */
  const grafikkarte = sequelize.define("grafikkarte", {
    artikelnummer: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'artikelnummer',
      autoIncrement: true
    },
    kapazitaet: {
      type: Sequelize.INTEGER,
      field: 'kapazitaet'
    },
    model: {
      type: Sequelize.STRING,
      field: 'model'
    },
    verbrauch: {
      type: Sequelize.INTEGER,
      field: 'verbrauch'
    },
    url: {
      type: Sequelize.STRING,
      field: 'url'
    },
    streamProzessoren: {
      type: Sequelize.INTEGER,
      field: 'streamProzessoren'
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'Grafikkarte'
  });

  return grafikkarte;
};
