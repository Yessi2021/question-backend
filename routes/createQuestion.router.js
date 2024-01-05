const { Router } = require('express');
const { validarCampos, validarJWT } = require('../middlewares/validate-jwt');
const { createQuestions, deleteQuestion } = require('../controllers/createQuestion.controller.js');
const {  authenticateToken } = require('../helpers/jwt.js');
const router = Router()

// Rutas (protegida)
router.post('/', validarJWT, createQuestions);
router.delete('/:id', validarJWT, deleteQuestion )

module.exports = router;
