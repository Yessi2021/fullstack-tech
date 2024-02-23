/*
RUTAS DE USUARIO
localhost:4000/api/auth/new
*/
const { Router } = require('express');
// check valida un campo en particular
const { check } = require('express-validator')
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } 
= require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos');

// ENVIAR INFORMACION
// el array es una collections de midelwares
router.post('/new',
  [  //midelware
     check('name', 'The name is required').not().isEmpty(),
     check('email', 'The email is required').isEmail(),
     check('password', 'The password must be at least 6 characters').isLength({min: 6}),
     validarCampos
     
 ], 

 crearUsuario)


router.post('/', 
[
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must be at leats 6 characters').isLength({min: 6}),
    validarCampos
],

loginUsuario);


router.get('/renew', validarJWT ,revalidarToken);    

module.exports = router;