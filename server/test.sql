SELECT answer.id, answer.body, answer.answer_date, answer.answerer_name, answer.helpfulness, answerPhoto.id, ARRAY_AGG(answerPhoto.url) AS url FROM answer JOIN answerPhoto ON answer.id=answerPhoto.answer_id WHERE question_id=5 GROUP BY answer.id LIMIT 5;

ARRAY_AGG(SELECT json_object_agg('url', answerPhoto.url) FROM answer JOIN answerPhoto ON answer.id=answerPhoto.answer_id WHERE question_id=1 GROUP BY answer.id) LIMIT 1;

SELECT json_object_agg('photos', json_build_object('id', (SELECT answerPhoto.id FROM answerPhoto), 'url', (SELECT answerPhoto.url FROM answerPhoto.id))) FROM answerPhoto JOIN answer ON answerPhoto.answer_id=answer.id LIMIT 5;

SELECT json_build_object('id', (SELECT answerPhoto.id FROM answerPhoto JOIN answer ON answer.id=answerPhoto.answer_id WHERE question_id=1 LIMIT 1), 'url', (SELECT answerPhoto.url FROM answerPhoto JOIN answer ON answer.id=answerPhoto.answer_id WHERE question_id=1 LIMIT 1)) FROM answerPhoto LIMIT 1;

-- SELECT jsonb_object_agg('photos', 'id', (SELECT answerPhoto.id FROM answerPhoto JOIN answer ON answer.id=answerPhoto.answer_id WHERE question_id=1), 'url', (SELECT answerPhoto.url FROM answerPhoto JOIN answer ON answer.id=answerPhoto.answer_id WHERE question_id=1));

-- select jsonb_object_agg(key,val) from (values ('id', (SELECT answerPhoto.id FROM answerPhoto JOIN answer ON answer.id=answerPhoto.answer_id WHERE question_id=1))) foo(key,val);

SELECT json_object_agg(json_build_object('id', answerPhoto.id, 'url', answerPhoto.url)) FROM answerPhoto JOIN answer ON answerPhoto.answer_id=answer.id WHERE question_id=1 LIMIT 1;

SELECT array_agg(json_build_object('id', (answerPhoto.id), 'url', (answerPhoto.url))) FROM answerPhoto JOIN answer ON answerPhoto.answer_id=answer.id WHERE question_id=1 LIMIT 5;

--working
SELECT array_agg(json_build_object('id', (answerPhoto.id), 'url', (answerPhoto.url))) AS photos FROM answerPhoto JOIN answer ON answerPhoto.answer_id=answer.id WHERE question_id=1 LIMIT 5;

SELECT answer.id, answer.body, answer.answer_date, answer.answerer_name, answer.helpfulness, array_agg(json_build_object('id', (answerPhoto.id), 'url', (answerPhoto.url))) AS photos FROM answer JOIN answerPhoto ON answer.id=answerPhoto.answer_id WHERE question_id=1 GROUP BY answer.id LIMIT 5;