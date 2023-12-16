module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für gehaeuse
   *
   * @autor Mokhtar Yosofzay
   */
  const gehaeuse = sequelize.define("gehaeuse", {
    artikelnummer: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'artikelnummer',
      autoIncrement: true
    },
    formfaktor: {
      type: Sequelize.STRING,
      field: 'formfaktor'
    },
    frontanschluesse: {
      type: Sequelize.STRING,
      field: 'frontanschlüsse'
    },
    abmessungen: {
      type: Sequelize.STRING,
      field: 'abmessungen'
    },
    url: {
      type: Sequelize.STRING,
      field: 'url'
    },
    typ: {
      type: Sequelize.STRING,
      field: 'typ'
    },
    gewicht: {
      type: Sequelize.INTEGER,
      field: 'gewicht'
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'Gehäuse'
  });

  return gehaeuse;
};
