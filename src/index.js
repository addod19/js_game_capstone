import 'phaser';
import config from './config';
import GameScene from './scenes/GameScene';
import GuideScene from './scenes/GuideScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import DisplayScoreScene from './scenes/DisplayScoreScene';
import SceneSounds from './SceneSounds';

/* global Phaser */
/* eslint no-undef: "error" */

const Game = class extends Phaser.Game {
  constructor() {
    super(config);
    const sceneSound = new SceneSounds();

    this.globals = { sceneSound, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Guide', GuideScene);
    this.scene.add('DispalyScore', DisplayScoreScene);
    this.scene.start('Boot');
  }
};

// let game;
window.game = new Game();