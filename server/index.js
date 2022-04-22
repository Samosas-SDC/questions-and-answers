require('dotenv').config();
const express = require('express');
const app = express();
const models = require('./models/models');

let PORT = process.env.SERVER_PORT || 3000;

app.listen(3000, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get('/qa/questions', (req, res) => {
  models.getQuestions({
    product_id: req.query.product_id,
    page: req.query.page || 1,
    count: req.query.count || 5
  })
    .then(response => {
      // console.log({
      //   product_id: req.query.product_id,
      //   results: response.rows
      // });
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get(`/qa/questions/:question_id/answers`, (req, res) => {
  let questionId = req.params.question_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5;

  models.getAnswers({
    question_id: questionId,
    page: page,
    count: count
  })
    .then(response => {
      let formattedResponse = {
        question: questionId,
        page: page,
        count: count,
        results: response.rows
      };

      res.status(200).send(formattedResponse);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});