import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  //request data from the bottom of the dataset
  for (let id = 3518948; id <= 3518963; id++) {
    http.get(`http://localhost:3000/qa/questions/${id}/answers`, {
      tags: { name: 'GetAnswersURL' }
    });
  }
}