require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const models = require('./models/models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get('/qa/questions', (req, res) => {
  let formattedResponse = {};
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

      return Promise.all(response.rows.map(question => models.getAnswers({
        question_id: question.question_id,
        count: count
      })));
    })
    .then(answers => {
      for (let i = 0; i < answers.length; i++) {
        answers[i].rows.forEach(ans => {
          if (!formattedResponse.results[i].answers) {
            formattedResponse.results[i].answers = {
              [ans.id]: ans
            }
          } else {
            formattedResponse.results[i].answers[ans.id] = ans;
          }
        });
      }

      res.status(200).send(formattedResponse);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
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

      res.status(200).send(formattedResponse);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post('/qa/questions', (req, res) => {
  models.addQuestion(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  let params = req.body;
  params.question_id = req.params.question_id;

  models.addAnswer(params)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});