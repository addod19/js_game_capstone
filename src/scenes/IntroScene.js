/*  global Phaser  */
/*  eslint no-undef: "error"  */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["centerButtonText"] }]  */

import 'phaser';
import config from '../config';
import Button from '../elements/Button';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  create() {
    // Game Title

    this.gameTitle = this.add.text(config.width / 2 - 80, config.height / 2 - 150, 'Best Maskman? ', {
      fontSize: this.game.config.width / 20,
      align: 'center',
      backgroundColor: '#32a852',
    });

    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 80, 'Button1', 'Button2', 'Play', 'Guide');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'Button1', 'Button2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 80, 'Button1', 'Button2', 'Credits', 'Credits');

    this.soundz = this.sys.game.globals.soundz;
    if (this.soundz.musicOn === true && this.soundz.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.soundz.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2,
        config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
