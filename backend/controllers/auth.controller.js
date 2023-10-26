const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * Registrierung-Controller
 * 
 * Dieser Controller verarbeitet Anfragen für eine Registrierung
 * 
 * @param {} req 
 * @param {*} res 
 */
exports.signup = (req, res) => {
  // Speichere Nutzer in die Datenbank
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8) // Verschlüssele Passwort
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          // Erstelle Nutzer mit den übergebenen Rollen
          user.setRoles(roles).then(() => {
            res.send({
              message: "Der Nutzer wurde erfolgreich registriert!"
            });
          });
        });
      } else {
        // Erstelle Nutzer mit der Rollen-ID 1 (user)
        user.setRoles([1]).then(() => {
          res.send({
            message: "Der Nutzer wurde erfolgreich registriert!"
          });
        });
      }
    })
    .catch(err => {
      // Sende Fehlermeldung bei einem Fehler
      res.status(500).send({ message: err.message });
    });
};

/**
 * Anmeldung-Controller
 * 
 * Dieser Controller verarbeitet Anfragen für die Anmeldung von Nutzern
 * 
 * @param {} req 
 * @param {*} res 
 */
exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Nutzer nicht gefunden." });
      }

      // Vergleiche eingegebens Passwort mit dem Passwort des Nutzers
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Passwort ist falsch!"
        });
      }

      // Erstelle verschlüsselten JWT-Token
      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        // Sende Nutzerdaten zurück
        res.status(200).send({
          id: user.id,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      // Gebe Fehlermeldung zurück
      res.status(500).send({ message: err.message });
    });
};
