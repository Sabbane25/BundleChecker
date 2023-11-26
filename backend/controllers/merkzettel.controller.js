const db = require("../models");
const Merkzettel = db.merkzettel;
const Artikel = db.artikel;

/**
 * Merkzettel-Controller
 *
 * Dieser Controller verarbeitet Anfragen für die Merkzettel
 */

/**
 * Anlegen eines neuen Merkzettels
 *
 * @param {} req
 * @param {*} res
 */
exports.create = (req, res) => {
    // Erstelle neuen Merkzettel und speichere ihn in der Datenbank
    Merkzettel.create({
        label: req.body.label,
        userId: req.userId,
    })
        .then(merkzettel => {
            res.send({
                message: "Merkzettel wurde angelegt!",
                id: merkzettel.id,
            });
        })
        .catch(err => {
            // Sende Fehlermeldung bei einem Fehler
            res.status(500).send({message: err.message});
        });
};

/**
 * Hinzufügen eines neuen Produktes
 *
 * @param req
 * @param res
 */
exports.add = (req, res) => {
    const merkzettelId = req.body.merkzettelId;
    const artikel = req.body.produktLink;

    Merkzettel.findOne({
        where: {
            id: merkzettelId,
            userId: req.userId
        }
    }).then(merkzettel => {
        if (!merkzettel) {
            return res.status(404).send({message: "Merkzettel nicht gefunden!"});
        } else {
            Artikel.findOne({
                where: {
                    produktLink: artikel
                }
            }).then(artikel => {
                if (!artikel) {
                    return res.status(404).send({message: "Artikel nicht gefunden!"});
                } else {
                    merkzettel.addArtikel(artikel);
                    res.send({message: "Artikel wurde hinzugefügt!"});
                }
            });
        }
    });
};

/**
 * Merkzettel löschen
 *
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    const merkzettellId = req.body.merkzettellId;

    Merkzettel.findOne({
        where: {
            id: merkzettellId,
            userId: req.userId
        }
    }).then(merkzettel => {
        if (!merkzettel) {
            return res.status(404).send({message: "Merkzettel nicht gefunden!"});
        } else {
            merkzettel.destroy();
            res.send({message: "Merkzettel wurde gelöscht!"});
        }
    });
};

/**
 * Artikel aus Merkzettel entfernen
 *
 * @param req
 * @param res
 */
exports.removeItemFromList = (req, res) => {
    const merkzettelId = req.body.merkzettelId;
    const artikel = req.body.produktLink;

    Merkzettel.findOne({
        where: {
            id: merkzettelId,
            userId: req.userId
        }
    }).then(merkzettel => {
        if (!merkzettel) {
            return res.status(404).send({message: "Merkzettel nicht gefunden!"});
        } else {
            Artikel.findOne({
                where: {
                    produktLink: artikel
                }
            }).then(artikel => {
                if (!artikel) {
                    return res.status(404).send({message: "Artikel nicht gefunden!"});
                } else {
                    merkzettel.removeArtikel(artikel);
                    res.send({message: "Artikel wurde aus der Liste entfernt!"});
                }
            });
        }
    });
};

/**
 * Hole alle Listen für einen Nutzer
 *
 * @param req
 * @param res
 */
exports.list = (req, res) => {
    Merkzettel.findAll({
        where: {
            userId: req.userId
        }
    }).then(merkzettel => {
        res.send(merkzettel);
    });
}

/**
 * Hole alle Artikel für einen Merkzettel
 *
 * @param req
 * @param res
 */
exports.listWithProducts = (req, res) => {
    const merkzettelId = req.params.merkzettelid;

    Merkzettel.findOne({
        where: {
            id: merkzettelId,
            userId: req.userId
        }
    }).then(merkzettel => {
        if (!merkzettel) {
            return res.status(404).send({message: "Merkzettel nicht gefunden!"});
        } else {
            merkzettel.getArtikels().then(artikel => {
                res.send(artikel);
            });
        }
    });
}

/**
 * Lade den Preis aller Artikel in einem Merkzettel
 *
 * @param req
 * @param res
 */
exports.priceOfList = (req, res) => {
    const merkzettelId = req.params.merkzettelid;

    Merkzettel.findOne({
        where: {
            id: merkzettelId,
            userId: req.userId
        }
    }).then(merkzettel => {
        if (!merkzettel) {
            return res.status(404).send({message: "Merkzettel nicht gefunden!"});
        } else {
            merkzettel.getArtikels().then(artikel => {
                let sum = 0;
                artikel.forEach(artikel => {
                    sum += artikel.preis;
                });
                res.send({price: sum});
            });
        }
    });
}
