var express = require('express');
const controllers = require('../controllers');
var router = express.Router();
var array = [1, 2, 3];


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express Curso de pruebas' });
});

router.get('/test', function (req, res, next) {
  res.send({ title: 'Express Curso de pruebas' });
});

router.get('/test/:id', function (req, res, next) {
  res.send({ title: 'Express Curso de pruebas' + req.params.id });
});

router.get('/test/:id', function (req, res, next) {
  res.send({ title: 'Express Curso de pruebas' + req.params.id });
});

router.post('/test', function (req, res, next) {
  console.log(req.body);
  array.push(req.body.number);
  res.send({ array: array });
});

router.put('/test/:id', function (req, res, next) {
  array[req.params.id] = req.body.number;
  res.send({ array: array });
});

/*UTILIZANDO LOS MODULOS DE CONTROLADORES*/
router.get('/testController', controllers.tvController.getArray);
router.post('/testController/', controllers.tvController.postArray);
router.get('/testController/:id', controllers.tvController.getById);
router.delete('/testController/:id', controllers.tvController.deleteTvShow);
router.put('/testController/:id', controllers.tvController.updateTvShow);
router.post('/createToken', controllers.tokenController.crearToken);
router.get('/createToken/:token', controllers.tokenController.descifrarToken);
router.get('/extArray',controllers.tvController.extArray);
router.post('/extCreate',controllers.tvController.extCreate);
module.exports = router;
