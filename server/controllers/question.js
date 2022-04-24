const models = require('../models');

module.exports = {
  getQuestions: function (req, res) {
    let formattedResponse = {};
    let productId = req.query.product_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;

    models.question.getQuestions({
      product_id: productId,
      page: page,
      count: count
    })
      .then(response => {
        formattedResponse = {
          product_id: productId,
          results: response.rows
        }

        return Promise.all(response.rows.map(question => models.answer.getAnswers({
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
  },
  addQuestion: function (req, res) {
    models.question.addQuestion(req.body)
      .then(response => {
        res.status(201).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  markHelpful: function (req, res) {
    models.question.markHelpful(req.params.question_id)
      .then(response => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  report: function (req, res) {
    models.question.report(req.params.question_id)
      .then(response => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
}