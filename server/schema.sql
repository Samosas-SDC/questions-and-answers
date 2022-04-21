--psql -h localhost -U postgres -d qadb -f server/schema.sql


CREATE TABLE question (
  id SERIAL NOT NULL,
  product_id INT NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date DATE NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  question_helpfulness INT NOT NULL,
  reported INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE answer (
  id SERIAL NOT NULL,
  question_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date DATE NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported INT NOT NULL DEFAULT 0,
  helpfulness INT,
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
