import http from 'k6/http';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', //1000 RPS
      duration: '30s',
      preAllocatedVUs: 100, //inital pool of VUs
      maxVUs: 1000,
    },
  },
};

export default function () {
  //request data from the bottom of the dataset
  // for (let id = 1000000; id <= 1000011; id++) {
  //   http.get(`http://localhost:3000/qa/questions?product_id=${id}`, {
  //     tags: { name: 'GetQuestionsURL' }
  //   });
  // }

  http.get(`http://localhost:3000/qa/questions?product_id=${Math.floor(Math.random() * 1000000)}`);
};
