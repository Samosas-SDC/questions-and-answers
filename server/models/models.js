let db = require('../db');

module.exports = {
  getQuestions: function (params) {
    let text = 'SELECT id, question_body, question_date, asker_name, question_helpfulness, reported FROM question WHERE product_id=$1 LIMIT $2;';
    let values = [params.product_id, params.count];
    return db.query(text, values);
  },
  getAnswers: function (params) {
    let text = 'SELECT id, body, answer_date, answerer_name, helpfulness FROM answer WHERE question_id=$1 LIMIT $2;';
    let values = [params.question_id, params.count];
    return db.query(text, values);
  }
}