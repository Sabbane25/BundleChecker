const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 * Prüfe, ob eine E-Mail Adresse bereits in Verwendung
 *
 * @autor Mokhtar Yosofzay
 */
checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
      where: {
      email: req.body.email
      }
  }).then(user => {
      if (user) {
      res.status(400).send({
        message: "E-Mail Adresse bereits vergeben!"
      });
      return;
      }

      next();
  });
};

/**
 * Prüfe, ob die Rolle existiert
 *
 * @autor Mokhtar Yosofzay
 */
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Die Rolle existiert nicht = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
