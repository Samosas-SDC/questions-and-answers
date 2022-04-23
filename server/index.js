require('dotenv').config();
const express = require('express');
const app = express();
const models = require('./models/models');

let PORT = process.env.SERVER_PORT || 3000;

app.listen(3000, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get('/qa/questions', (req, res) => {
  let formattedResponse = {};
  // let questionId = req.params.question_id;
  let productId = req.query.product_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5;

  models.getQuestions({
    product_id: productId,
    page: page,
    count: count
  })
    .then(response => {
      formattedResponse = {
        product_id: productId,
        results: response.rows
      }

      res.status(200).send(formattedResponse);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get(`/qa/questions/:question_id/answers`, (req, res) => {
  let formattedResponse = {};
  let questionId = req.params.question_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5;

  models.getAnswers({
    question_id: questionId,
    page: page,
    count: count
  })
    .then(response => {
      formattedResponse = {
        question: questionId,
        page: page,
        count: count,
        results: response.rows
      };

      return Promise.all(response.rows.map(answer => models.getPhotos(answer.id)));
    })
    .then(photos => {
      for (let i = 0; i < photos.length; i++) {
        formattedResponse.results[i].photos = photos[i].rows;
      }
      res.status(200).send(formattedResponse);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});