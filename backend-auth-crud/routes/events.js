// AQUI VA EL CRUD

/*RUTA '/api/events' */

const { Router } = require('express')
const router = Router()
const { getEventos, createEvento, actualizarEventos, eliminarEvento} = 
require('../controllers/events')
const { check } =  require('express-validator')
 const { validarCampos } = require('../middlewares/validar-campos')
// vamos a validar las rutas con JWT
const { validarJWT } = require('../middlewares/validar-jwt')
const { isDate } = require('../helpers/isDate')



router.use( validarJWT )
 

router.get('/', getEventos)

router.post('/',
[
    check('title','The title is required').not().isEmpty(),
   

   validarCampos
],

createEvento
 
 );

router.put('/:id', actualizarEventos)

router.delete('/:id', eliminarEvento)


module.exports = router;