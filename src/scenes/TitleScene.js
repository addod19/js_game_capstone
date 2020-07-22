import Phaser from 'phaser';

import config from '../config';
import Button from '../Elements/Button';

/* eslint no-undef: "error" */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["centerButtonText"] }]  */

const TitleScene = class extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Setting background to full width and height
    const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sprBg0');
    const scaleX = this.cameras.main.width / image.width;
    const scaleY = this.cameras.main.height / image.height;
    const scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(1);

    this.gameTitle = this.add.text((config.width / 2) + 50, (config.height / 2) - 260, 'Best Maskman? ', {
      fontSize: this.game.config.width / 20,
      align: 'center',
      backgroundColor: '#000000',
    });

    this.gameButton = new Button(this, (config.width / 2) - 400, (config.height / 2) - 60, 'Button1', 'Button2', 'Play', 'Guide');

    this.optionsButton = new Button(this, (config.width / 2) - 200, (config.height / 2) - 60, 'Button1', 'Button2', 'Options', 'Options');

    this.creditsButton = new Button(this, config.width / 2, (config.height / 2) - 60, 'Button1', 'Button2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });

      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2,
        (config.height / 2) - (offset * 100), config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
};

export default TitleScene;