import Phaser from 'phaser';

import config from '../config';
import Button from '../Elements/Button';

/* eslint no-undef: "error" */

const OptionsScene = class extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sprBg0');
    const scaleX = this.cameras.main.width / image.width;
    const scaleY = this.cameras.main.height / image.height;
    const scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(1);

    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 50, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(200, 100, 'unchecked');
    this.musicText = this.add.text(250, 100, 'Music Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.gameButton = new Button(this, (config.width / 2), (config.height / 2) + 100, 'Button1', 'Button2', 'Back', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
  }
};

export default OptionsScene;