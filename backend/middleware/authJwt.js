const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

/**
 * Verifiziere, ob Token Valide ist
 *
 * @autor Mokhtar Yosofzay
 */
verifyToken = (req, res, next) => {
  // Der Token wird über den Header `x-access-token` übergeben
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Kein token übergeben!"
    });
  }

  jwt.verify(token,
    config.secret,
    (err, decoded) => {
        if (err) {
          // Fehlerausgabe, wenn Nutzer nicht verifiziert werden konnte
          return res.status(401).send({
              message: "Unauthorized!",
          });
        }
        req.userId = decoded.id; // speichere Nutzer-ID im Request für weitere Verwendung
        next();
    });
};

/**
 * Prüfe, ob Nutzer ein Admin ist
 *
 * @autor Mokhtar Yosofzay
 */
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Admin Rolle erforderlich!"
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin
};
module.exports = authJwt;
