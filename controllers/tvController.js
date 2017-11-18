let array = [1, 2, 3];
const obj = {};
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

obj.getArray = (req, res, next) => {
    res.send(tvShows);
};
obj.postArray = (req, res, next) => {
    tvShows.push(req.body);
    res.send(tvShows);
}
obj.getById = (req, res, next) => {
    let tvFind = tvShows.find((tvShow) => tvShow.id === Number.parseInt(req.params.id));
    if (!tvFind) {
        return res.send({ error: `Show: ${req.params.id},no encontrado}` });
    }
    res.send(tvFind);
}
obj.deleteTvShow = (req, res, next) => {
    let indexTvShow = tvShows.findIndex((tvShow) => tvShow.id === Number.parseInt(req.params.id));
    if (indexTvShow < 0) {
        return res.send({ error: `Show: ${req.params.id},no encontrado}` });
    } else {
        tvShows.splice(indexTvShow, 1);
        res.send(tvShows);
    }    
}
obj.updateTvShow = (req,res,next)=>{
    let indexTvShow = tvShows.findIndex((tvShow) => tvShow.id === Number.parseInt(req.params.id));
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
    tvShows[indexTvShow] = tvShow;
    return res.send(tvShows);
}


module.exports = obj;
