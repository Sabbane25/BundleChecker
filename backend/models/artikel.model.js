module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für Artikel
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
    produktLink: {
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
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'Artikel'
  });

  return artikel;
};
