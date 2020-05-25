import 'phaser';
import config from '../config';
import Button from '../Elements/Button';

/* global Phaser */
/* eslint no-undef: "error" */

class GuideScene extends Phaser.Scene {
  constructor() {
    super('Guide');
  }

  create() {
    this.gameTitle = this.add.text(config.width / 3 - 150, config.height / 2 - 100, 'Best Maskman ', {
      fontSize: this.game.config.width / 15,
      align: 'center',
      backgroundColor: '#000000',
      color: '#11edba',
      fontFamily: 'open-sans',
    });

    this.gameTitle = this.add.text(config.width / 2 - 600, config.height / 2, 'When '
      + 'the game starts, the enemy starts attacking the mask man.'
      + '\n For the mask man to survive, he needs to kill as many'
      + '\n enemy as possible. The score keeps increasing for every kill'
      + '\n . If the mask man fails to kill enemy and enemy escapes'
      + '\n the game ends. Use arrow keys in the keyboard to'
      + ' \n move up, down, left, right, and the space bar/ enter to shoot'
      + '\n ', {
      fontSize: '3em',
      align: 'center',
      backgroundColor: '#000000',
      color: '#11edba',
      fontFamily: 'open-sans',
    });

    this.gameButton = new Button(this, config.width / 2 - -300, config.height / 2 + 100, 'Button1', 'Button2', 'Play', 'Game');
  }
}

export default GuideScene;