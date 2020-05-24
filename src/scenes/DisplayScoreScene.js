import 'phaser';
import config from '../config';
import Button from '../Elements/Button';
// import Form from '../Elements/form';

class DisplayScoreScene extends Phaser.Scene {
  constructor() {
    super('DisplayScore');
  }

  init(data) {
    this.score = data.level;
  }

  preload() {
  }

  create() {
    this.user = '';
    this.scoreList = [];
    this.user = this.inputName();

  }

  inputName() {
    this.userName = this.add.text(config.width / 2 - 270, config.height / 2 - 78,
      'Enter your Name, Gamer : ', {
        fontSize: '4em',
        align: 'center',
        color: '#7d12c9',
        marginTop: '2em',
      });
    this.userName.setScrollFactor(0);


    return this.user;
  }

  displayLeaderboard() {
    this.postScore(this.user, this.score);
    this.userName.setText('');

    this.scoreLine1 = this.add.text(config.width / 2 - 50, config.height / 2 - 150,
      'High Scores', {
        fontSize: '4em',
        align: 'center',
        color: '#7d12c9',
      });
    this.scoreLine1.setScrollFactor(0);
    setTimeout(() => {
      this.getScores();
    }, 1000);
    this.quitGameBtn = new Button(this, config.width / 2, config.height / 2 + 80,
      'Button1', 'Button2', 'Exit Game', 'Title');
    this.quitGameBtn.setScrollFactor(0);
  }

  async getScores() {
    const topScores = [];
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/')
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
      });
      // console.log(result);
    return topScores;
  }

  displayPlayersScore(data) {
    let [user, score] = data[0];
    this.scoreLine2 = this.add.text(config.width / 2 - 80, config.height / 2 - 120,
      `${user}   -   ${score}`, {
        fontSize: '4em',
        align: 'center',
        color: '#7d12c9',
      });
    this.scoreLine2.setScrollFactor(0);

    [user, score] = data[1];
    this.scoreLine3 = this.add.text(config.width / 2 - 80, config.height / 2 - 100,
      `${user}   -   ${score}`, {
        fontSize: '4em',
        align: 'center',
        color: '#7d12c9',
      });
    this.scoreLine3.setScrollFactor(0);

    [user, score] = data[2];
    this.scoreLine4 = this.add.text(config.width / 2 - 80, config.height / 2 - 80,
      `${user}   -   ${score}`, {
        fontSize: '4em',
        align: 'center',
        color: '#7d12c9',
      });
    this.scoreLine4.setScrollFactor(0);

    [user, score] = data[3];
    this.scoreLine5 = this.add.text(config.width / 2 - 80, config.height / 2 - 60,
      `${user}   -   ${score}`, {
        fontSize: '4em',
        align: 'center',
        color: '#7d12c9',
      });
    this.scoreLine5.setScrollFactor(0);

    [user, score] = data[4];
    this.scoreLine6 = this.add.text(config.width / 2 - 80, config.height / 2 - 40,
      `${user}   -   ${score}`, {
        fontSize: '4em',
        align: 'center',
        color: '#7d12c9',
      });
    this.scoreLine6.setScrollFactor(0);

    this.scoreLine6 = this.add.text(config.width / 2 - 180, config.height / 2,
      `This game has been played ${data.length - 50} times`, {
        fontSize: '4em',
        align: 'center',
        color: '#7d12c9',
      });
    this.scoreLine6.setScrollFactor(0);
  }


  async postScore(u, s) {
    const url = '';
    const userScore = {
      user: u,
      score: s,
    };
    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(userScore),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // send POST request
    fetch(url, options)
      .then(res => res.json());
  }
}

export default DisplayScoreScene;