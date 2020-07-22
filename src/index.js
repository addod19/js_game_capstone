import Phaser from 'phaser';

import config from './config';
import GameScene from './scenes/GameScene';
import GuideScene from './scenes/GuideScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import DisplayScoreScene from './scenes/DisplayScoreScene';
import GameOverScene from './scenes/GameOverScene';
import Model from './Model';

/* eslint no-undef: "error" */
/* eslint import/no-unresolved: "error" */

/* eslint no-unused-vars: 2 */

const Game = class extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();

    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Guide', GuideScene);
    this.scene.add('DispalyScore', DisplayScoreScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.start('Boot');
  }
};

// let game;
window.game = new Game();