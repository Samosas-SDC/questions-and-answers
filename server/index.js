require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const controllers = require('./controllers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

//routes
app.get('/qa/questions', controllers.question.getQuestions);

app.get('/qa/questions/:question_id/answers', controllers.answer.getAnswers);

app.post('/qa/questions', controllers.question.addQuestion);

app.post('/qa/questions/:question_id/answers', controllers.answer.addAnswer);

app.put('/qa/questions/:question_id/helpful', controllers.question.markHelpful);

app.put('/qa/questions/:question_id/report', controllers.question.report);

app.put('/qa/answers/:answer_id/helpful', controllers.answer.markHelpful);

app.put('/qa/answers/:answer_id/report', controllers.answer.report);