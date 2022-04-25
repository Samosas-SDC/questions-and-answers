import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  // http.get('http://localhost:3000/qa/questions?product_id=1');
  // sleep(1);

  //request data from the bottom of the dataset
  for (let id = 1000000; id <= 1000011; id++) {
    http.get(`http://localhost:3000/qa/questions?product_id=${id}`, {
      tags: { name: 'GetQuestionsURL' }
    });
  }
}
