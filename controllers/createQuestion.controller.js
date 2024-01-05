const Question = require('../models/question.js');


const createQuestions = async (req, res) => {
     try {
     
      const questions = new Question(req.body)
      const questionsSaved =  await questions.save()
      res.json({questions: questionsSaved})
     } catch (error) {
        console.log(error);
     }


};


const deleteQuestion = async (req, res = response ) => {

  const uid = req.uid;
  const questionId = req.params.id;

    try {
        const question = await Question.findById(questionId)
        console.log(question)

        if (!question) {
          return res.status(404).json({
                ok:false,
                msg:"Evento no existe con ese ID"
            })
        }

        if (question.user.toString() !== uid) {
          return res.status(401).json({
              ok:false,
              msg:"No tiene privilegio de eliminar este evento"
          })  
      }

        await Question.findByIdAndDelete(questionId)
        // si todo salio ok
        res.json({
            ok:true,
            msg:"Questionario eliminado!"
        })
    } catch (error) {
      console.log(error)
      res.status(500).json({
          ok:false,
          msg: "Hable con el administrador"
      })
    }

  }


  module.exports = {
    createQuestions,
    deleteQuestion
    
  }