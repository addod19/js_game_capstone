import sci1Img from "../assets/sci1.png";
import sci2Img from "../assets/sci2.png";
// import sci3Img from "./assets/explosion.xcf.bz2";
import sci4Img from "../assets/hour.png";
// import laserSound from '../assets/laser1.wav';

class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
    }
  
    preload() {
      this.load.image("Bg0", sci1Img);
      this.load.image("Bg1", sci2Img);
      this.load.spritesheet("myExplosion", sci3Img, {
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet("Enemy0", sci4Img, {
        frameWidth: 16,
        frameHeight: 16
      });
    }
}

export default MainScene;