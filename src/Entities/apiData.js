async function postScore(name, s) {
  const url = '';
  const userScore = {
    user: name,
    score: s,
  };
    // request options
  const payload = {
    method: 'POST',
    body: JSON.stringify(userScore),
    headers: {
      'Content-Type': 'application/json',
    }
  };

  // send POST request
  fetch(url, payload)
    .then(res => res.json());
}

async function getScores() {
  const topScores = [];
  const apiKey = 'Zl4d7IVkemOTTVg2fUdz';
  fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`, { mode: 'cors' })
    .then(response => response.json())
    .then(scores => {
      const { result } = scores;
      result.forEach((row) => {
        const { user, score } = row;
        topScores.push([user, score]);
      });
      topScores.sort((x, y) => {
        if (x[1] === y[1]) {
          return 0;
        }
        return (y[1] - x[1]);
      });
      this.displayPlayersScore(topScores);
    })
    .catch(error => [error]);
  return topScores;
}

export { postScore, getScores };