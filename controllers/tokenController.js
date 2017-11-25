const jwt = require('jsonwebtoken');
const moment = require('moment');
let secret = 'xxx';

const objToken = {}

objToken.crearToken = (req, res, next) => {
    let payload = req.body;
    payload.iat = moment().unix();
    payload.exp = moment().add(30, 's').unix();
    let token = jwt.sign(payload, secret, {}, (err, token) => {
        if (err) {
            return res.send({ error: err });
        }
        res.send({ token });
    });

}

objToken.descifrarToken = (req, res, next) => {
    let payload = jwt.verify(req.params.token, secret, {}, (err, payload) => {
        if (err) {
            return res.send({ error: err });
        }
        if (moment().unix() <= payload.exp) {
            return res.send({ payload });
        }
        return res.send({ error: 'Token expirado' });
    });
}

objToken.validarTokenMidd = (req, res, next) => {
    if (!req.headers.token) {
        return res.send({ error: 'Se requiere token' });
    }
    let payload = jwt.verify(req.headers.token, secret, {}, (err, payload) => {
        if (err) {
            return res.send({ error: err });
        }
        return next();
    });
}
module.exports = objToken;