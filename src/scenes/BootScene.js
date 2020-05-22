import bg from '../assets/sci1.png';
import player from '../assets/sci2.png';
import enemy from '../assets/enemy';

import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', bg);
    this.load.image('player', player);
    this.load.spritesheet('birds', enemy, {
      frameWidth: 125,
      frameHeight: 100,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}