--psql -h localhost -U postgres -d qadb -f server/schema.sql

-- *****ETL*****
-- COPY question (id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM '/Users/james/questions.csv' DELIMITER ',' CSV HEADER;
-- COPY answer (id, question_id, body, answer_date, answerer_name, answerer_email, reported, helpfulness) FROM '/Users/james/answers.csv' DELIMITER ',' CSV HEADER;
-- COPY answerPhoto (id, answer_id, url) FROM '/Users/james/answers_photos.csv' DELIMITER ',' CSV HEADER;


--AFTER IMPORTING DATA FROM CSV, RUN THE FOLLOWING TO REFORMAT DATA:
--ALTER TABLE question ALTER COLUMN question_date SET DATA TYPE timestamp with time zone USING to_timestamp(question_date/1000);
--ALTER TABLE question ALTER COLUMN reported SET DATA TYPE boolean USING reported::boolean;
--ALTER TABLE question ALTER COLUMN reported SET DEFAULT false;

--ALTER TABLE answer ALTER COLUMN answer_date SET DATA TYPE timestamp with time zone USING to_timestamp(answer_date/1000);
--ALTER TABLE answer ALTER COLUMN reported SET DATA TYPE boolean USING reported::boolean;
--ALTER TABLE answer ALTER COLUMN reported SET DEFAULT false;

--RESET PRIMIARY KEY NEXT VAL
--SELECT setval('question_id_seq', max(id)) FROM question;
--SELECT setval('answer_id_seq', max(id)) FROM answer;
--SELECT setval('answerphoto_id_seq', max(id)) FROM answerPhoto;

DROP TABLE IF EXISTS question cascade;
DROP TABLE IF EXISTS answer cascade;
DROP TABLE IF EXISTS answerPhoto;

CREATE TABLE question (
  id SERIAL NOT NULL,
  product_id INT NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  question_helpfulness INT DEFAULT 0,
  reported INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE answer (
  id SERIAL NOT NULL,
  question_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  answer_date BIGINT NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported INT NOT NULL,
  helpfulness INT DEFAULT 0,
  PRIMARY KEY (id),
  CONSTRAINT fk_question
    FOREIGN KEY (question_id)
      REFERENCES question (id)
);

CREATE TABLE answerPhoto (
  id SERIAL NOT NULL,
  answer_id INT NOT NULL,
  url TEXT,
  PRIMARY KEY (id),
  CONSTRAINT fk_answer
    FOREIGN KEY (answer_id)
      REFERENCES answer (id)
);

CREATE INDEX product_id ON question (product_id);
CREATE INDEX question_id ON answer (question_id);
CREATE INDEX answer_id ON answerPhoto (answer_id);

