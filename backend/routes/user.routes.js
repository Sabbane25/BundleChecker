const {verifySignUp, authJwt} = require("../middleware");
const controller = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");

/**
 * Nutzer Schnittstellen
 *
 * @autor Arnauld Mba Kuitche
 * @author Mokhtar Yosofzay
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

  //GET-Endpunk zum Abrufen von Produkten (Arnauld)
  app.get('/getUsers', (req, res) => {
    console.log('Empfangene Anfrage-Methode:', req.method); // Logge die empfangene HTTP-Methode

    const query = `SELECT n.email, n.password, n.id
                   FROM nutzer n
                          JOIN nutzer_nutzer_rollen_join nr ON n.id = nr.user_id
                   WHERE nr.role_id = 1`;

    connection.query(query, (err, results) => {
      if (err) {
        console.error('Fehler beim Abrufen der Nutzerdaten: ' + err);
        res.status(500).json({ error: 'Fehler beim Abrufen der Nutzerdaten' });
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(results);
    });
  });

  app.delete(
      '/users/:id',
      [
          authJwt.verifyToken, // prüfe ob token valide ist
          authJwt.isAdmin, // prüfe ob Nutzer Admin ist
      ],
      adminController.delete
  );

  app.put(
      '/changePassword',
      [
        authJwt.verifyToken, // prüfe ob token valide ist
        authJwt.isAdmin, // prüfe ob Nutzer Admin ist
      ],
      adminController.changePassword,
  );

  app.post(
      '/addUser',
      [
        verifySignUp.checkDuplicateEmail,
        verifySignUp.checkRolesExisted
      ],
      controller.signup
  );
}
