/*  global Phaser  */
/*  eslint no-undef: "error"  */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["postScore"] }] */
/*  eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */

import 'phaser';
import config from '../config';
import Button from '../Objects/Button';
// import FormUtil from '../Objects/FormUtil';

export default class DisplayScoreScene extends Phaser.Scene {
  constructor() {
    super('DisplayScore');
  }

  init(data) {
    this.score = data.level;
  }

  // preload() {
  // }

  create() {
    this.user = '';
    this.scoreList = [];
    this.user = this.inputName();
  }

  inputName() {
    this.userName = this.add.text(config.width / 2 - 270, config.height / 2 - 78,
      'Enter your Name : ', {
        fontSize: this.game.config.width / 40,
        align: 'center',
        backgroundColor: '#000000',
      });
    this.userName.setScrollFactor(0);
    this.formUtil = new FormUtil({
      scene: this,
      rows: 11,
      cols: 11,
    });
    this.formUtil.scaleToGameW('area51', 0.3);
    this.formUtil.scaleToGameH('area51', 0.08);
    this.formUtil.placeElementAt(75, 'area51', true, true);
    this.user = this.formUtil.addChangeCallback('area51', this.textAreaChanged, this);
    this.formUtil.scaleToGameW('btnSend', 0.25);
    this.formUtil.placeElementAt(97, 'btnSend');
    this.formUtil.addClickCallback('btnSend', this.displayLeaderboard, this);
    return this.user;
  }

  textAreaChanged() {
    this.user = this.formUtil.getTextAreaValue('area51');
    // console.log(` ${this.user}   ' first '    ${this.score} `);
    return this.user;
  }

  displayLeaderboard() {
    this.postScore(this.user, this.score);
    this.userName.setText('');
    let elno = document.getElementById('area51');
    elno.style.display = 'none';
    elno = document.getElementById('btnSend');
    elno.style.display = 'none';

    this.scoreLine1 = this.add.text(config.width / 2 - 50, config.height / 2 - 150,
      'Top Scores', {
        fontSize: this.game.config.width / 40,
        align: 'center',
        backgroundColor: '#000000',
      });
    this.scoreLine1.setScrollFactor(0);
    setTimeout(() => {
      this.getScores();
    }, 1000);
    this.quitGameBtn = new Button(this, config.width / 2, config.height / 2 + 80,
      'blueButton1', 'blueButton2', 'Exit Game', 'Title');
    this.quitGameBtn.setScrollFactor(0);
  }

  async getScores() {
    const topScores = [];
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BxAIfHmwEjEPsh8DTd3o/scores/')
      .then(response => response.json())
      .then(scores => {
        const { result } = scores;
        // console.log(result);
        result.forEach((row) => {
          const { user, score } = row;
          topScores.push([user, score]);
        });
        // console.log(result.length);
        topScores.sort((x, y) => {
          if (x[1] === y[1]) {
            return 0;
          } //  else {
          return (y[1] - x[1]);
          //  }
        });
        this.displayPlayersScore(topScores);
      });
    return topScores;
  }

  displayPlayersScore(data) {
    let [user, score] = data[0];
    this.scoreLine2 = this.add.text(config.width / 2 - 80, config.height / 2 - 120,
      `${user}   -   ${score}`, {
        fontSize: this.game.config.width / 40,
        align: 'center',
        backgroundColor: '#000000',
      });
    this.scoreLine2.setScrollFactor(0);

    [user, score] = data[1];
    this.scoreLine3 = this.add.text(config.width / 2 - 80, config.height / 2 - 100,
      `${user}   -   ${score}`, {
        fontSize: this.game.config.width / 40,
        align: 'center',
        backgroundColor: '#000000',
      });
    this.scoreLine3.setScrollFactor(0);

    [user, score] = data[2];
    this.scoreLine4 = this.add.text(config.width / 2 - 80, config.height / 2 - 80,
      `${user}   -   ${score}`, {
        fontSize: this.game.config.width / 40,
        align: 'center',
        backgroundColor: '#000000',
      });
    this.scoreLine4.setScrollFactor(0);

    [user, score] = data[3];
    this.scoreLine5 = this.add.text(config.width / 2 - 80, config.height / 2 - 60,
      `${user}   -   ${score}`, {
        fontSize: this.game.config.width / 40,
        align: 'center',
        backgroundColor: '#000000',
      });
    this.scoreLine5.setScrollFactor(0);

    [user, score] = data[4];
    this.scoreLine6 = this.add.text(config.width / 2 - 80, config.height / 2 - 40,
      `${user}   -   ${score}`, {
        fontSize: this.game.config.width / 40,
        align: 'center',
        backgroundColor: '#000000',
      });
    this.scoreLine6.setScrollFactor(0);

    this.scoreLine6 = this.add.text(config.width / 2 - 180, config.height / 2,
      `This game has been played ${data.length - 50} times`, {
        fontSize: this.game.config.width / 40,
        align: 'center',
        backgroundColor: '#000000',
      });
    this.scoreLine6.setScrollFactor(0);
  }


  async postScore(u, s) {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BxAIfHmwEjEPsh8DTd3o/scores/';
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
    // .then(res => console.log(res));
  }
}