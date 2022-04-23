let db = require('../db');

module.exports = {
  getQuestions: function (params) {
    let text = `SELECT id, question_body, question_date, asker_name, question_helpfulness, reported
      FROM question
      WHERE product_id=$1
      LIMIT $2;`;
    let values = [params.product_id, params.count];

    return db.query(text, values);
  },
  getAnswers: function (params) {
    let text = `SELECT answer.id, answer.body, answer.answer_date, answer.answerer_name, answer.helpfulness, array_agg(json_build_object('id', (answerPhoto.id), 'url', (answerPhoto.url))) AS photos
      FROM answer JOIN answerPhoto ON answer.id=answerPhoto.answer_id
      WHERE question_id=$1
      GROUP BY answer.id
      LIMIT $2;`;
    let values = [params.question_id, params.count];

    return db.query(text, values);
  },
}