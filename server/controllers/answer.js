const models = require('../models');

module.exports = {
  getAnswers: function (req, res) {
    let formattedResponse = {};
    let questionId = req.params.question_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;

    models.answer.getAnswers({
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
  },
  addAnswer: function (req, res) {
    let params = req.body;
    params.question_id = req.params.question_id;

    models.answer.addAnswer(params)
      .then(response => {
        res.status(201).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  markHelpful: function (req, res) {
    models.answer.markHelpful(req.params.answer_id)
      .then(response => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  report: function (req, res) {
    models.answer.report(req.params.answer_id)
      .then(response => {
        res.sendStatus(204);
      })
      .catch(err => {
        re.status(500).send(err);
      });
  },
}