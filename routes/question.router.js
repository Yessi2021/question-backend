const { Router } = require('express');
const { getQuestions } = require('../controllers/questions.controller.js')

const router = Router();

  router.get('/', getQuestions)


module.exports = router;