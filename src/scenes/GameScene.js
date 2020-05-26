import 'Phaser';
import config from '../config';
import Button from '../Elements/Button';
import background from '../../assets/sci1.png';

/* global Phaser */
/* eslint no-undef: "error" */

const GameScene = class extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.text = this.add.text(32, 32);
    this.displayResult = '';
    this.score = 0;
    this.penalty = 0;
    this.netScore = 0;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;

    this.background = this.add.image(0, 0, background);
    this.background.setOrigin(0, 0);

    this.shooter = this.physics.add.sprite(this.centerX, this.centerY, 'shooter');
    this.shooter.body.collideWorldBounds = true;
    this.shooter.displayWidth = this.game.config.width * 0.10;
    this.shooter.scaleY = this.shooter.scaleX;

    this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);

    this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    this.cameras.main.startFollow(this.shooter, true);

    this.enemyGroup = this.physics.add.group({
      key: 'enemy',
      frame: [0, 1, 2],
      frameQuantity: 5,
      bounceX: 1,
      bounceY: 1,
      angularVelocity: 1,
      collideWorldBounds: true,
    });
    // this.enemyGroup.setGravityY(100);

    this.enemyGroup.children.iterate((child) => {
      const cord1 = Math.floor(Math.random() * this.background.displayWidth);
      const cord2 = Math.floor(Math.random() * this.background.displayHeight);
      child.x = cord1;
      child.y = cord2;
      child.displayWidth = this.game.config.width * 0.05;
      child.scaleY = child.scaleX;

      let pCord1 = Math.floor(Math.random() * 2) - 1;
      let pCord2 = Math.floor(Math.random() * 2) - 1;
      if (pCord1 === 0 && pCord2 === 0) {
        pCord1 = 1;
        pCord2 = 1;
      }
      const speed = Math.floor(Math.random() * 100) + 30;
      setTimeout(() => {
        child.body.setVelocity(pCord1 * speed, pCord2 * speed);
      }, 1000);
    });
    this.physics.add.collider(this.enemyGroup, this.shooter, this.enemyScream, null, this);
    this.makeInfo();
  }

  enemyScream(shooter, enemy) {
    this.sound.play('scream');
    enemy.destroy();
    this.endGame();
  }

  makeInfo() {
    this.text1 = this.add.text(10, 10, 'Score Earned: ', {
      fontSize: '3em',
      align: 'center',
      backgroundColor: '#ba2051',
    });

    this.text1.setScrollFactor(0);
  }

  upscore() {
    this.score += 1;
    this.text1.setText(`Score Earned: ${this.score}`);
  }

  endGame() {
    this.gameOver = this.add.text(config.width / 2 - 80, config.height / 2 - 150, 'GAME OVER ', {
      fontSize: '3em',
      align: 'center',
      backgroundColor: '#000000',
    });
    this.result = this.add.text('');
    if (this.score > 0) {
      this.result = `Congrats, your score is:  ${this.score}`;
    }
    if (this.score <= 0) {
      this.result = 'Sorry, Game Over, Try Again';
    }

    this.displayResult = this.add.text(config.width / 2 - 280, config.height / 2 - 80,
      this.result, {
        fontSize: '3em',
        align: 'center',
        backgroundColor: '#000000',
      });

    if (this.score > 0) {
      this.gameScoreBtn = new Button(this, config.width / 2, config.height / 2 + 80,
        'Button1', 'Button2', 'Score Board', '');
      this.gameScoreBtn.setScrollFactor(0);
      setTimeout(() => {
        this.scene.start('DisplayScore', { level: this.score });
      }, 1000);
    } else {
      this.quitGameBtn = new Button(this, config.width / 2, config.height / 2 + 80,
        'Button1', 'Button2', 'Exit Game', 'Title');
      this.quitGameBtn.setScrollFactor(0);
    }
    this.gameOver.setScrollFactor(0);
    this.displayResult.setScrollFactor(0);
  }

  update() {
    this.shooter.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.shooter.body.setVelocityX(-80);
      this.upscore();
    } else if (this.cursors.right.isDown) {
      this.shooter.body.setVelocityX(80);
      this.upscore();
    }

    if (this.cursors.up.isDown) {
      this.shooter.body.setVelocityY(-80);
      this.upscore();
    } else if (this.cursors.down.isDown) {
      this.shooter.body.setVelocityY(80);
      this.upscore();
    }
  }

  render() {
    this.game.debug.text(`Elapsed seconds: ${this.game.time.totalElapsedSeconds()}`, 32, 32);
  }
};

export default GameScene;