let db = require('../db');

module.exports = {
  getQuestions: function (params) {
    let text = `SELECT id AS question_id, question_body, question_date, asker_name, question_helpfulness, reported
      FROM question
      WHERE product_id=$1
      ORDER BY id
      LIMIT $2
      OFFSET $3;`;
    let values = [params.product_id, params.count, (params.page - 1) * params.count];

    return db.query(text, values);
  },
  addQuestion: function (params) {
    let text = `INSERT INTO question (product_id, question_body, question_date, asker_name, asker_email)
    VALUES ($1, $2, NOW(), $3, $4);`;
    let values = [params.product_id, params.body, params.name, params.email];

    return db.query(text, values);
  },
  markHelpful: function (questionId) {
    let text = `UPDATE question
      SET question_helpfulness=question_helpfulness + 1
      WHERE id=$1`;
    let values = [questionId];

    return db.query(text, values);
  },
  report: function (questionId) {
    let text = `UPDATE question
      SET reported=true
      WHERE id=$1`;
    let values = [questionId];

    return db.query(text, values);
  },
}