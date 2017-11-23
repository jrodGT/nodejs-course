const jwt = require('jwt-simple');

let secret = 'xxx';

const objToken = {}

objToken.crearToken = (req,res,next)=>{
    let token = jwt.encode(req.body,secret);
    res.send({token});
}

objToken.descifrarToken = (req,res,next)=>{
    let decodificacion = jwt.decode(req.headers.token,secret);
    res.send({decodificacion});
}

module.exports = objToken;