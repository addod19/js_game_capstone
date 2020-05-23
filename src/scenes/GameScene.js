import 'phaser';
import config from '../config';
import Button from '../Elements/Button';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
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

    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);

    this.shooter = this.physics.add.sprite(this.centerX, this.centerY, 'shooter');
    this.shooter.body.collideWorldBounds = true;
    this.shooter.displayWidth = this.game.config.width * 0.15;
    this.shooter.scaleY = this.shooter.scaleX;

    this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);

    this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    this.cameras.main.startFollow(this.plane, true);

    this.enemyGroup = this.physics.add.group({
      key: 'enemy',
      frame: [0, 1, 2],
      frameQuantity: 5,
      bounceX: 1,
      bounceY: 1,
      angularVelocity: 1,
      collideWorldBounds: true,
    });

    this.enemyGroup.children.iterate((child) => {
      const xx = Math.floor(Math.random() * this.background.displayWidth);
      const yy = Math.floor(Math.random() * this.background.displayHeight);
      child.x = xx;
      child.y = yy;
      child.displayWidth = this.game.config.width * 0.05;
      child.scaleY = child.scaleX;

      let vx = Math.floor(Math.random() * 2) - 1;
      let vy = Math.floor(Math.random() * 2) - 1;
      if (vx === 0 && vy === 0) {
        vx = 1;
        vy = 1;
      }
      const speed = Math.floor(Math.random() * 100) + 15;
      setTimeout(() => {
        child.body.setVelocity(vx * speed, vy * speed);
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
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });

    this.text1.setScrollFactor(0);

  }

  upscore() {
    this.score += 1;
    this.text1.setText(`Score Earned: ${this.score}`);
  }

  endGame() {
    this.gameOver = this.add.text(config.width / 2 - 80, config.height / 2 - 150, 'GAME OVER ', {
      fontSize: this.game.config.width / 20,
      align: 'center',
      backgroundColor: '#000000',
    });
    this.result = this.add.text('');
    if (this.score > 0) {
      this.result = `Congrats, you have scored  ${this.score}`;
    }
    if (this.score <= 0) {
      this.result = 'Sorry, Game Over, Try Again';
    }

    this.displayResult = this.add.text(config.width / 2 - 280, config.height / 2 - 80,
      this.result, {
        fontSize: this.game.config.width / 20,
        align: 'center',
        backgroundColor: '#000000',
      });

    if (this.score > 0) {
      this.gameScoreBtn = new Button(this, config.width / 2, config.height / 2 + 80,
        'blueButton1', 'blueButton2', 'Score Board', '');
      this.gameScoreBtn.setScrollFactor(0);
      setTimeout(() => {
        this.scene.start('DisplayScore', { level: this.score });
      }, 1000);
    } else {
      this.quitGameBtn = new Button(this, config.width / 2, config.height / 2 + 80,
        'blueButton1', 'blueButton2', 'Exit Game', 'Title');
      this.quitGameBtn.setScrollFactor(0);
    }
    this.gameOver.setScrollFactor(0);
    this.displayResult.setScrollFactor(0);
  }

  update() {
    this.plane.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.plane.body.setVelocityX(-80);
      this.upscore();
    } else if (this.cursors.right.isDown) {
      this.plane.body.setVelocityX(80);
      this.upscore();
    }

    if (this.cursors.up.isDown) {
      this.plane.body.setVelocityY(-80);
      this.upscore();
    } else if (this.cursors.down.isDown) {
      this.plane.body.setVelocityY(80);
      this.upscore();
    }
  }

  render() {
    this.game.debug.text(`Elapsed seconds: ${this.game.time.totalElapsedSeconds()}`, 32, 32);
  }
}

export default GameScene;