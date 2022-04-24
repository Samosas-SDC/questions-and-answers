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
  getAnswers: function (params) {
    let text = `SELECT answer.id, answer.body, answer.answer_date AS date, answer.answerer_name, answer.helpfulness, array_agg(json_build_object('id', (answerPhoto.id), 'url', (answerPhoto.url))) AS photos
      FROM answer JOIN answerPhoto ON answer.id=answerPhoto.answer_id
      WHERE question_id=$1
      GROUP BY answer.id
      LIMIT $2;`;
    let values = [params.question_id, params.count];

    return db.query(text, values);
  },
  addQuestion: function (params) {
    let text = `INSERT INTO question (product_id, question_body, question_date, asker_name, asker_email)
    VALUES ($1, $2, NOW(), $3, $4);`;
    let values = [params.product_id, params.body, params.name, params.email];

    return db.query(text, values);
  },
  addAnswer: function (params) {
    let text = `INSERT INTO answer (question_id, body, answer_date, answerer_name, answerer_email)
    VALUES ($1, $2, NOW(), $3, $4);`;
    let values = [params.question_id, params.body, params.name, params.email];

    if (params.photos && params.photos.length) {
      let queries = [];

      queries.push(db.query(text, values));

      params.photos.map((url, i) => {
        text = `INSERT INTO answerPhoto (answer_id, url)
        VALUES (lastval(), $1)`
        values = [params.photos[i]];

        queries.push(db.query(text, values));
      })

      return Promise.all(queries);
    }

    return db.query(text, values);
  },
}