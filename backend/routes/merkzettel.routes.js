const {authJwt} = require("../middleware");
const controller = require("../controllers/merkzettel.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/merkzettel/create",
        [
            authJwt.verifyToken // prüfe ob token valide ist
        ],
        controller.create
    );

    app.post(
        "/api/merkzettel/add",
        [
            authJwt.verifyToken // prüfe ob token valide ist
        ],
        controller.add
    );

    app.delete(
        "/api/merkzettel/list/:merkzettellId",
        [
            authJwt.verifyToken // prüfe ob token valide ist
        ],
        controller.delete
    );

    app.post(
        "/api/merkzettel/remove",
        [
            authJwt.verifyToken // prüfe ob token valide ist
        ],
        controller.removeItemFromList
    );

    app.get(
        "/api/merkzettel/list",
        [
            authJwt.verifyToken // prüfe ob token valide ist
        ],
        controller.list
    );

    app.get(
        "/api/merkzettel/list/:merkzettelid",
        [
            authJwt.verifyToken // prüfe ob token valide ist
        ],
        controller.listWithProducts
    );

    app.get(
        "/api/merkzettel/price/:merkzettelid",
        [
            authJwt.verifyToken // prüfe ob token valide ist
        ],
        controller.priceOfList
    );
};
