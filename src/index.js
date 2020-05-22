import Phaser from "phaser";
import config from './config';
import sci1Img from "./assets/sci1.png";
import sci2Img from "./assets/sci2.png";
import enemy from './enemy';
import Player from './player';
import playerSprite from './assets/play.gif';
import MainScene from '../src/scenes/MainScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    // const sound = new Sound();

    // this.globals = { sound, bgMusic: null };
    // this.scene.add('Boot', BootScene);
    this.scene.add('MainScene', MainScene);
    // this.scene.add('Title', TitleScene);
    // this.scene.add('Options', OptionsScene);
    // this.scene.add('Credits', CreditsScene);
    // this.scene.add('Game', GameScene);
    // this.scene.add('Guide', GuideScene);
    // this.scene.add('DispalyScore', DisplayScoreScene);
    this.scene.start('MainScene');
  }
}

// let game;
window.game = new Game();