import Phaser from 'phaser';

import config from '../config';
import Button from '../Elements/Button';


class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  preload() {
    this.load.image('gameOverTitle', 'assets/btn2.png');
    this.load.image('sprImg', 'assets/sci1.png');
    this.load.audio('gameOverMusic', 'assets/battleMus.mp3');
  }

  create() {
    const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sprBg0');
    const scaleX = this.cameras.main.width / image.width;
    const scaleY = this.cameras.main.height / image.height;
    const scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(1);

    this.gameOver = this.sound.add('gameOverMusic', { volume: 0.6 });
    this.gameOver.play();
    this.add.image(this.game.config.width * 0.5, 240, 'sprImg').setScale(0.35);
    this.add.image(this.game.config.width * 0.52, 80, 'gameOverTitle').setScale(0.7);

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.85,
      'BtnPlay',
    );

    this.btnSubmit = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.75,
      'BtnPlay',
    );


    this.submitTitle = this.add.text(this.game.config.width * 0.41, this.game.config.height * 0.725, 'SUBMIT', {
      fontFamily: 'sans-serif',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#FFFFFF',
      align: 'center',
    });

    this.restartTitle = this.add.text(this.game.config.width * 0.39, this.game.config.height * 0.825, 'RESTART', {
      fontFamily: 'sans-serif',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#FFFFFF',
      align: 'center',
    });

    const inputName = document.createElement('div');
    inputName.innerHTML = '<input type ="text" id= "nameInput" class="nameInput" placeholder= "Enter your name"></input>';

    this.add.dom(this.game.config.width * 0.78, 420, inputName);

    this.score = this.add.text(this.game.config.width * 0.3, 360, `Your Score is: ${localStorage.getItem('score')}`, {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.gameButton = new Button(this, config.width / 2, config.height / 2 + 100, 'Button1', 'Button2', 'Restart', 'Game');
  }
}

export default GameOverScene;