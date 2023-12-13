// Autor: Mokhtar Yosofzay
// Autor: Tim Heider

const db = require("../models");
const User = db.user;

var bcrypt = require("bcryptjs");

/**
 * Lösche Nutzer
 *
 * @param {} req
 * @param {*} res
 */
exports.delete = (req, res) => {
    let userId = req.params.id;

    if (userId) {
        userId = parseInt(userId);
    }
    if (!userId || typeof userId !== 'number') {
        return res.status(400).json({message: 'User-ID ist erforderlich'});
    }

    User.findOne({
        where: {
            id: userId,
        }
    })
        .then(user => {
            if (user.id !== req.userId) {
                user.destroy();

                res.status(200).send({
                    message: `Der Nutzer "${user.email}" wurde erfolgreich gelöscht!`,
                });
            } else {
                res.status(400).send({
                    message: `Du kannst dich nicht selber Löschen!`,
                });
            }
        })
        .catch(err => {
            // Sende Fehlermeldung bei einem Fehler
            res.status(500).send({message: "Fehler beim Löschen des Benutzers:", error: err.message});
        });
}

/**
 * Passwort ändern-Controller
 *
 * Dieser Controller verarbeitet Anfragen um das Passwort eines Nutzers zu ändern
 *
 * @param {} req
 * @param {*} res
 */
exports.changePassword = (req, res) => {
    const { id, password } = req.body;

    // Überprüfe ob id übergeben wurde
   // if (!id || typeof id !== 'string') {
     //   return res.status(400).json({ message: 'ID ist erforderlich' });
    //}

    // Überprüfe ob Passwort gültiges Passwort format entspricht
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: 'Passwort ist erforderlich' });
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

    User.findOne({
        where: {
            id: id,
        }
    })
        .then(user => {
             // Verschlüssele Passwort
            user.password = bcrypt.hashSync(password, 8);
            user.save();
            res.send({
                message: `Das Passwort wurde gespeichert.`
            });
        })
        .catch(err => {
            // Sende Fehlermeldung bei einem Fehler
            res.status(500).send({ title: `Fehler beim Passwort speichern!`, message: err.message });
        });
};
