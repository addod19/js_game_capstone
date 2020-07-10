import 'regenerator-runtime';

// global variables
const apiKey = 'Zl4d7IVkemOTTVg2fUdz';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`;

const postScore = async (name, s) => {
  
  const userScore = {
    user: name,
    score: s,
  };
    // request options
  const payload = {
    method: 'POST',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userScore),
  };

  // send POST request
  const response = await fetch(url, payload);
  const data = await response.json();
  // console.log(data)
  return data;
}

const getScores = async () => {
  const payload = {
    method: 'Get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  const response = await fetch(url, payload);
  const topScores = await response.json();

  console.log(response);
  
  return topScores.data;
}

export { postScore, getScores };