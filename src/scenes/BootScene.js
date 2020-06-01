import 'phaser';

/* global phaser */
/* eslint no-undef: "error" */
/* eslint import/no-unresolved: "error" */

const BootScene = class extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/sci1.png');
    this.load.image('shooter', 'assets/play.gif');
    this.load.spritesheet('sprEnemy2', 'assets/content/enemyUFO.png', {
      frameWidth: 125,
      frameHeight: 100,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
};

export default BootScene;