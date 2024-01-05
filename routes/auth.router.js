
const { Router } = require('express');
// check valida un campo en particular
const { check } = require('express-validator')
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } 
= require('../controllers/auth.controller.js');
 const { validarJWT } = require('../middlewares/validate-jwt.js')
const { validarCampos } = require('../middlewares/auth-validation.js');

router.post('/new',
  [  //midelware
     check('name', 'El nombre es obligatorio').not().isEmpty(),
     check('email', 'El email es obligatorio').isEmail(),
     check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
     validarCampos
     
 ], 

 crearUsuario)

router.post('/', 
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos
],

loginUsuario);


router.get('/renew', validarJWT ,revalidarToken);    

module.exports = router;