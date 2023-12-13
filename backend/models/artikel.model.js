module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für Artikel
   *
   * @autor Mokhtar Yosofzay
   */
  const artikel = sequelize.define("artikel", {
    kategorie: {
      type: Sequelize.STRING,
      field: 'kategorie'
    },
    preis: {
      type: Sequelize.FLOAT,
      field: 'preis'
    },
    shopID: {
      type: Sequelize.INTEGER,
      field: 'shopID'
    },
    produktUrl: {
      type: Sequelize.STRING,
      primaryKey: true,
      field: 'produktUrl'
    },
    bezeichnung: {
      type: Sequelize.STRING,
      field: 'bezeichnung'
    },
    lieferDatum: {
      type: Sequelize.INTEGER,
      field: 'lieferDatum'
    },
    marke: {
      type: Sequelize.STRING,
      field: 'marke'
    },
    bildUrl: {
      type: Sequelize.STRING,
      field: 'image'
    },
    verfuegbarkeit: {
      type: Sequelize.STRING,
      field: 'verfügbarkeit'
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'Artikel'
  });

  return artikel;
};
