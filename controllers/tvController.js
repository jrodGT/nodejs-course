let array = [1, 2, 3];
const obj = {};

const mongoose = require('mongoose');
const TVShow = mongoose.model('TVShow');

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
const toDo = (callback) => {
    TVShow.find((err, tvShows) => {
        if (err) {
            return callback({ error: err }, null);
        }
        callback(null, tvShows);

    });
}

obj.getArray = (req, res, next) => {
    //res.send(tvShows);
    /*TVShow.find((err, tvShows) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.send(tvShows);
        }
    });*/
    toDo((error, result) => {
        if (error) {
            return res.send({ error: error });
        }
        res.send(result);
    });
};

obj.postArray = (req, res, next) => {
    let data = new TVShow(
        {
            titulo: req.body.titulo,
            anio: req.body.anio,
            pais: req.body.pais
        });

    data.save((err, result) => {
        if (err) {
            return res.send({ error: err });
        } else {
            let a = algo();
            if (a.error) {
                return res.send({ error: a.error });
            } else {
                res.send(a);
            }
            return res.send();
        }
    });
}
obj.getById = (req, res, next) => {
    TVShow.findById(req.params.id, (error, result) => {
        if (error) {
            return res.send({ error: error });
        } else {
            if (result) {
                return res.send(result);
            } else {
                return res.send({ error: `Show: ${req.params.id},no encontrado}` });
            }

        }
    });
}
obj.deleteTvShow = (req, res, next) => {
    TVShow.findByIdAndRemove(req.params.id, (error, result) => {
        if (error) {
            return res.send({ error: error });
        } else {
            res.send(result);
        }
    });
}
obj.updateTvShow = (req, res, next) => {
    TVShow.findByIdAndUpdate(req.params.id, req.body, (error, result) => {
        if (error) {
            return res.send({ error: error });
        } else {
            res.send(result);
        }
    });
    /*let indexTvShow = tvShows.findIndex((tvShow) => tvShow.id === Number.parseInt(req.params.id));
    if (indexTvShow < 0) {
        return res.send({ error: `Show: ${req.params.id},no encontrado}` });
    }
    //obtengo el objeto en la posicion según el id
    let tvShow = tvShows[indexTvShow];
    //actualizo las propiedades del objeto, manteniendo el id
    tvShow.anio = req.body.anio;
    tvShow.pais = req.body.pais;
    tvShow.titulo = req.body.titulo;
    //substituyo el objeto en la posición por el que contiene los cambios realizados
    tvShows[indexTvShow] = tvShow;*/
    //return res.send(tvShows);
}


module.exports = obj;
