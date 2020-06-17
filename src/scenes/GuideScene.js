import Phaser from 'phaser';

import config from '../config';
import Button from '../Elements/Button';

/* eslint no-undef: "error" */

const GuideScene = class extends Phaser.Scene {
  constructor() {
    super('Guide');
  }

  create() {
    const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sprBg0');
    const scaleX = this.cameras.main.width / image.width;
    const scaleY = this.cameras.main.height / image.height;
    const scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(1);

    this.gameTitle = this.add.text(config.width / 3 - 10, config.height / 2 - 100, 'Best Maskman ', {
      fontSize: this.game.config.width / 15,
      align: 'center',
      backgroundColor: '#000000',
      color: '#11edba',
      fontFamily: 'open-sans',
    });

    this.gameTitle = this.add.text(config.width / 2 - 600, config.height / 2, 'When '
      + 'the game starts, the enemy starts attacking the mask man.'
      + '\n For the mask man to survive, he needs to kill as many'
      + '\n enemies as possible. The score keeps increasing for every kill'
      + '\n . If the mask man fails to kill the enemies and the enemy kills'
      + '\n the maskman, he looses a life for every laser hit.Until all given lifes get used up'
      + '\n Use arrow keys on the keyboard to'
      + ' \n move up, down, left, right, and the space bar/ enter to shoot'
      + '\n ', {
      fontSize: '3em',
      fontFamily: 'sans-serif',
      align: 'center',
      backgroundColor: '#000000',
      color: '#11edba',
    });

    this.gameButton = new Button(this, config.width / 2 - -400, config.height / 2 + 100, 'Button1', 'Button2', 'Play', 'Game');
  }
};

export default GuideScene;