const { response, request } = require('express')
const Question = require('../models/question.js');

const getQuestions = async (req = request, res = response) => {
  try {
    const questionsDocument = await Question.aggregate([
      { $sample: { size: 10 } }
    ]);

    // Mapea los resultados para excluir los campos no deseados
    const questions = questionsDocument.map(question => {
      const { _id, user, ...rest } = question;
      return rest;
    });

    res.json({
      ok: true,
      questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



module.exports = {
  getQuestions
}