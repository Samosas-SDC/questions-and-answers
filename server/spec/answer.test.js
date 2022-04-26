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
      maxVUs: 750,
    },
  },
};

export default function () {
  //request data from the bottom of the dataset
  // for (let id = 3518948; id <= 3518963; id++) {
  //   http.get(`http://localhost:3000/qa/questions/${id}/answers`, {
  //     tags: { name: 'GetAnswersURL' }
  //   });
  // }

  http.get(`http://localhost:3000/qa/questions/${Math.floor(Math.random() * 3518963)}/answers`);
};