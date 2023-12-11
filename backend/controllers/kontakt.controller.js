// Autor: Mokhtar Yosofzay

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'bundlechecker@outlook.de',
        pass: 'Checker123'
    }
});

exports.sendMail = (req, res) => {
    const email = req.body.email;
    const vorname = req.body.vorname;
    const nachname = req.body.nachname;
    const nachricht = req.body.nachricht;

    if (!email) {
        return res.status(500).send({success: false, message: "Es ist keine E-Mail angegeben"});
    }
    if (!vorname) {
        return res.status(500).send({success: false, message: "Es ist kein Vorname angegeben"});
    }
    if (!nachname) {
        return res.status(500).send({success: false, message: "Es ist kein Nachname angegeben"});
    }
    if (!nachricht) {
        return res.status(500).send({success: false, message: "Es ist keine Nachricht angegeben"});
    }

    const message = {
        from: 'bundlechecker@outlook.de',
        to: 'bundlechecker@outlook.de',
        subject: 'Eine neue E-Mail von ' + email + " " + vorname + " " + nachname,
        text: nachricht
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            return res.status(500).send({success: false, message: "Es ist ein Fehler aufgetreten: " + error.toString()});
        }
        res.status(200).send({success: true, message: 'Ihre Kontaktanfrage wurde gesendet.'});
    });
};
