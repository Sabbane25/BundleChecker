module.exports = (sequelize, Sequelize) => {

    /**
     * Modell für Merkzettel
     */
    const Merkzettel = sequelize.define("merkzettel",
        {
            userId: {
                type: Sequelize.INTEGER,
                field: 'user_id'
            },
            label: {
                type: Sequelize.STRING
            }
        },
        {
            underscored: true,
            freezeTableName: true,
            tableName: 'merkzettel'
        });

    return Merkzettel;
};
