# Questions &amp; Answers API
A back end service-oriented api scaled to support more than half a thousand requests per second for the questions and answers section of an eCommerce website.

## Technologies Used
- [Node.js](https://nodejs.org/en/) - RESTful API
- [Express](http://expressjs.com/) - Node.js Web App Framework
- [PostgreSQL](https://www.postgresql.org/) - Relational Database
- [NGINX](https://www.nginx.com/) - Load Balancing
- [k6](https://k6.io/) - Load Testing (Local)
- [Loader.io](https://loader.io/) - Load Testing (Cloud)

## API Endpoints
| Method        | Endpoint      | Description   | Parameters    |
| ------------- | ------------- | ------------- | ------------- |
| GET           | /qa/questions | Retrieves questions | product_id, page, count |
| GET           | /qa/questions/:question_id/answers | Retrieves answers | question_id, page, count |
| POST          | /qa/questions | Adds question | product_id, body, name, email |
| POST          | /qa/questions/:question_id/answers | Adds answer | question_id, body, name, email, photos |
| PUT           | /qa/questions/:question_id/helpful | Mark question as helpful | question_id |
| PUT           | /qa/questions/:question_id/report | Report question | question_id |
| PUT           | /qa/answers/:answer_id/helpful | Mark answer as helpful | answer_id |
| PUT           | /qa/answers/:answer_id/report | Report answer | answer_id |

## Performance Metrics with k6 (Local)
Goals:
- 1000 requests per second
- <50ms response time

Achieved:
- 38ms average response time for 1000rps

## Performance Metrics with Loader.io (Cloud)
Goals:
- <2000ms response time
- <1% error rate

Achieved:
### Endpoint: /qa/questions
![Screen Shot 2022-05-02 at 10 45 26 AM](https://user-images.githubusercontent.com/77183806/166298523-4cdf9334-7ae6-4c86-b1d3-c1d0cf748213.png)

### Endpoint: /qa/answers
![Screen Shot 2022-05-02 at 10 45 56 AM](https://user-images.githubusercontent.com/77183806/166298577-67c9bf56-6a10-4844-9a1d-c03129b35b3d.png)