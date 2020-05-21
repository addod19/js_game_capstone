import Phaser from "phaser";
import sci1Img from "./assets/sci1.png";
import sci2Img from "./assets/sci2.png";
import enemy from './enemy';
import player from './player';
import playerSprite from './assets/play.gif';
// import MainScene from '../src/scenes/MainScene';

const config = {
  type: Phaser.AUTO,
  width: 1275,
  height: 700,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('bg',sci1Img);
  this.load.image("logo", sci2Img);
  this.load.image('mainPlayer', playerSprite);
  enemy();
  player();
}

function create() {
  const bg = this.add.image(1270, 600, 'bg');
  const logo = this.add.image(700, 150);
  const mainPlayer = this.add.image(400, 160, 'mainPLayer');
 
}

function update() {
  
  
}
