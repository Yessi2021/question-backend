const { Schema, model } = require('mongoose');

const questionSchema = new Schema({

  name: { type: String, required: true },
  response_code: { type: Number, required: true },
  results: [
    {
     
      category: { type: String, required: true },
      type: { type: String, required: true },
      difficulty: { type: String, required: true },
      question: { type: String, required: true },
      correct_answer: { type: String, required: true },
      incorrect_answers: [String],
    }
  ],
  user: {
    type:Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
}
});


questionSchema.method('toJSON', function(){
 
  const { __v,_id,user,...object } = this.toObject();
  console.log('toJSON method called');
   
  // Cambia el nombre de _id a question_id
  object.question_id = _id;
  delete object._id;
  return object
})


module.exports = model('Question', questionSchema);


