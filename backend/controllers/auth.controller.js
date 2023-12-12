// Autor: Mokhtar Yosofzay

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
    const { email, password } = req.body;

    // Überprüfe ob E-Mail gültiges email format entspricht
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'E-Mail ist erforderlich' });
    }

    // Überprüfe ob Passwort gültiges Passwort format entspricht
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: 'Passwort ist erforderlich' });
    }

    // Überprüfe ob Email ein @ enthält und ein gültiges format entspricht
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        return res.status(400).json({ message: 'E-Mail ist ungültig' });
    }

    // Überprüfe ob Passwort mindestens 5 Zeichen lang ist
    if (password.length < 5) {
        return res.status(400).json({ message: 'Passwort muss mindestens 5 Zeichen lang sein' });
    }

    // Überprüfe ob Passwort mindestens ein Großbuchstaben enthält
    if (!password.match(/[A-Z]/)) {
        return res.status(400).json({ message: 'Passwort muss mindestens einen Großbuchstaben enthalten' });
    }

    // Überprüfe ob Passwort mindestens ein Kleinbuchstaben enthält
    if (!password.match(/[a-z]/)) {
        return res.status(400).json({ message: 'Passwort muss mindestens einen Kleinbuchstaben enthalten' });
    }

    // Überprüfe ob Passwort mindestens eine Zahl enthält
    if (!password.match(/\d/)) {
        return res.status(400).json({ message: 'Passwort muss mindestens eine Zahl enthalten' });
    }

    // Überprüfe ob Passwort mindestens ein Sonderzeichen enthält
    if (!password.match(/[!@#$%^&*]/)) {
        return res.status(400).json({ message: 'Passwort muss mindestens ein Sonderzeichen enthalten' });
    }


  // Speichere Nutzer in die Datenbank
  User.create({
    // User.updateOne({
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
