import 'phaser';
import sci1Img from "../assets/sci1.png";
import sci2Img from "../assets/sci2.png";
// import sci3Img from "./assets/explosion.xcf.bz2";
// import sci4Img from "../assets/hour.png";
import laserSound from '../assets/laser1.wav';

export default class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
    }
  
    preload() {
      const progressBar = this.add.graphics();
      const progressBox = this.add.graphics();
      progressBox.fillStyle(0xFFFFFF, 1);
      progressBox.fillRect(300, 250, 300, 70);
      console.log(progressBox);
      

      const { width } = this.cameras.main;
      const { height } = this.cameras.main;
      const loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
          font: '12px monospace',
          fill: '#ffffff',
        },
      });
      loadingText.setOrigin(0.5, 0.5);

      const percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
          font: '18px monospace',
          fill: '#ffffff',
        },
      });
      percentText.setOrigin(0.5, 0.5);

      const assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
          font: '18px monospace',
          fill: '#ffffff',
        },
      });
      assetText.setOrigin(0.5, 0.5);

      this.load.on('progress', (value) => {
        percentText.setText(`${parseInt(value * 100, 10)}%`);
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
      });

      this.load.on('fileprogress', (file) => {
        assetText.setText(`Loading asset: ${file.key}`);
      });

      // remove progress bar when complete
      this.load.on('complete', () => {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      });

      this.timedEvent = this.time.delayedCall(6000, this.ready, [], this);

      this.load.image('blueButton1', sci2Img);
      this.load.image('blueButton2', sci1Img);

      this.load.image('box', sci2Img);
      this.load.image('checkedBox', sci2Img);
      // this.load.audio('bgMusic', ['assets/b131.mp3']);
      this.load.audio('shoot', laserSound);

      // this.load.image("Bg0", sci1Img);
      // this.load.image("Bg1", sci2Img);
      // this.load.spritesheet("myExplosion", sci3Img, {
      //   frameWidth: 32,
      //   frameHeight: 32
      // });
      // this.load.spritesheet("Enemy0", sci4Img, {
      //   frameWidth: 16,
      //   frameHeight: 16
      // });
    }

    ready() {
      this.scene.start('Title');
      this.readyCount += 1;
      if (this.readyCount === 2) {
        this.scene.start('Title');
      }
    }

    // create() {
    //   this.load.image("Bg0", sci1Img);
    //   this.load.image("Bg1", sci2Img);
    // }
}

