const controller = require("../controllers/kontakt.controller");

/**
 * E-Mail senden
 *
 * @autor Mokhtar Yosofzay
 *
 * @param app
 * @param connection
 */
module.exports = function(app, connection) {
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // POST-Endpunk zum Senden von E-Mails
  app.post('/send-email', controller.sendMail);
};
