module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für ram
   *
   * @autor Mokhtar Yosofzay
   */
  const ram = sequelize.define("ram", {
    artikelnummer: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'artikelnummer',
      autoIncrement: true
    },
    typ: {
      type: Sequelize.STRING,
      field: 'typ'
    },
    kapazitaet: {
      type: Sequelize.INTEGER,
      field: 'kapazitaet'
    },
    latency: {
      type: Sequelize.INTEGER,
      field: 'latency'
    },
    url: {
      type: Sequelize.STRING,
      field: 'url'
    },
    spannung: {
      type: Sequelize.FLOAT,
      field: 'spannung'
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'RAM'
  });

  return ram;
};
