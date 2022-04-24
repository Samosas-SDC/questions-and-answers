let db = require('../db');

module.exports = {
  getQuestions: function (params) {
    let text = `SELECT id AS question_id, question_body, question_date, asker_name, question_helpfulness, reported
      FROM question
      WHERE product_id=$1
      LIMIT $2;`;
    let values = [params.product_id, params.count];

    return db.query(text, values);
  },
  addQuestion: function (params) {
    let text = `INSERT INTO question (product_id, question_body, question_date, asker_name, asker_email)
    VALUES ($1, $2, NOW(), $3, $4);`;
    let values = [params.product_id, params.body, params.name, params.email];

    return db.query(text, values);
  },
}