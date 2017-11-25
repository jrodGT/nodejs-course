let array = [1, 2, 3];
const obj = {};

const mongoose = require('mongoose');
const TVShow = mongoose.model('TVShow');
const rp = require('request-promise');
const tvShows = [
    {
        id: 1,
        titulo: 'LQ1',
        anio: 2017,
        pais: 'USA'
    },
    {
        id: 2,
        titulo: 'LQ2',
        anio: 2017,
        pais: 'GT'
    },
    {
        id: 3,
        titulo: 'LQ3',
        anio: 2017,
        pais: 'MEX'
    }
];

const todo = (tvshows) => {
    return new Promise((resolve, reject) => {
        if (tvshows.length < 0) {
            return reject({ error: 'No hay datos' });
        }
        return resolve({ data: tvshows.length });
    });
    //return TVShow.find();
}

obj.getArray = (req, res, next) => {
    TVShow.find()
        .then(tvShows => res.send(tvShows))
        .catch(err => res.send({ error: err })
        );
};

obj.extArray = (req, res, next) => {
    let requestOptions = {
        method: 'GET',
        uri: 'http://192.168.43.2:3000/test',
        headers: {
            'token': '12345',
            'Content-Type': 'application/json'
        },
        body: {},
        json: true
    };
    rp(requestOptions)
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

obj.extCreate = (req, res, next) => {
    let rqOp = {
        method: 'POST',
        uri: 'http://192.168.43.2:3000/test',
        headers: {
            'token':req.headers.token,
            'Content-Type': 'application/json'
        },
        body: req.body,
        json: true
    }

    rp(rqOp)
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

obj.postArray = (req, res, next) => {
    let data = new TVShow(
        {
            titulo: req.body.titulo,
            anio: req.body.anio,
            pais: req.body.pais
        });
    data.save()
        .then(resutl => res.send(result))
        .catch(err => res.send({ error: err })
        );
}

obj.getById = (req, res, next) => {
    TVShow.findById(req.params.id)
        .then(result => (result ? res.send(result) : res.send({ error: `Show: ${req.params.id},no encontrado}` })))
        .catch(err => res.send({ error: err }));
}

obj.deleteTvShow = (req, res, next) => {
    TVShow.findByIdAndRemove(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send({ error: err }));
}

obj.updateTvShow = (req, res, next) => {
    TVShow.findByIdAndUpdate(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send({ error: error }));
}

module.exports = obj;
