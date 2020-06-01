import 'phaser';
import config from '../config';
import Button from '../Elements/Button';
// import Player from '../Player';
import {Player, ChaserShip, GunShip, EnemyLaser, CarrierShip} from '../Entities';

/* global phaser */
/* eslint no-undef: "error" */

const GameScene = class extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('background', 'assets/content/Background/starBackground.png');
    this.load.image("sprBg0", "content/sprBg0.png");
    this.load.image("sprBg1", "content/sprBg1.png");
    
    this.load.image("sprEnemy1", "assets/content/enemyShip.png");
    
    this.load.image("sprLaserEnemy0", "assets/content/laserRed.png");
    this.load.image("sprLaserPlayer", "assets/content/laserGreen.png");

    this.load.audio("sndExplode0", "content/sndExplode0.wav");
    this.load.audio("sndExplode1", "content/sndExplode1.wav");
    this.load.audio("sndLaser", "content/sndLaser.wav");
    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sndLaser")
    };

    if (typeof player !== "undefined") {
      this.body.setVelocity(0, 0);

      this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
      this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
    }
    

    

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    ); 

  }
  create() {
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    );

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.load.spritesheet("sprEnemy2", "assets/content/enemyUFO.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("sprPlayer", "assets/content/player.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("sprExplosion", "content/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("sprEnemy0", "assets/enemy.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
            if (this.getEnemiesByType("ChaserShip").length < 5) {

              enemy = new ChaserShip(
                this,
                Phaser.Math.Between(0, this.game.config.width),
                0
              );
            }
          } else {
            enemy = new CarrierShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true    
    });

    this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
      // destroy enemy if hit by laser
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
      
        enemy.explode(true);
        playerLaser.destroy();
      }
    });
    
      
  }

  update() {
    this.player.update();

    if (this.keyW.isDown) {
      this.player.moveUp();
    }
    else if (this.keyS.isDown) {
      this.player.moveDown();
    }

    if (this.keyA.isDown) {
      this.player.moveLeft();
    }
    else if (this.keyD.isDown) {
      this.player.moveRight();
    }

    if (this.keySpace.isDown) {
      this.player.setData("isShooting", true);
    }
    else {
      this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
      this.player.setData("isShooting", false);
    }

    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];

      enemy.update();
      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
    
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
    
          enemy.destroy();
        }
    
      }
    }
    // Frees up processing power and memory
   

    for (let i = 0; i < this.enemyLasers.getChildren().length; i++) {
      let laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i++) {
      let laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    let arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
  


  // enemyScream(shooter, enemy) {
  //   this.sound.play('scream');
  //   enemy.destroy();
  //   this.endGame();
  // }

  // makeInfo() {
  //   this.text1 = this.add.text(10, 10, 'Score Earned: ', {
  //     fontSize: '3em',
  //     align: 'center',
  //     backgroundColor: '#ba2051',
  //   });

    // this.text1.setScrollFactor(0);
  // }

  // upscore() {
  //   this.score += 1;
  //   this.text1.setText(`Score Earned: ${this.score}`);
  // }

  // endGame() {
  //   this.gameOver = this.add.text(config.width / 2 - 80, config.height / 2 - 150, 'GAME OVER ', {
  //     fontSize: '3em',
  //     align: 'center',
  //     backgroundColor: '#000000',
  //   });
  //   this.result = this.add.text('');
  //   if (this.score > 0) {
  //     this.result = `Congrats, your score is:  ${this.score}`;
  //   }
  //   if (this.score <= 0) {
  //     this.result = 'Sorry, Game Over, Try Again';
  //   }

  //   this.displayResult = this.add.text(config.width / 2 - 280, config.height / 2 - 80,
  //     this.result, {
  //       fontSize: '3em',
  //       align: 'center',
  //       backgroundColor: '#000000',
  //     });

  //   if (this.score > 0) {
  //     this.gameScoreBtn = new Button(this, config.width / 2, config.height / 2 + 80,
  //       'Button1', 'Button2', 'Score Board', '');
  //     this.gameScoreBtn.setScrollFactor(0);
  //     setTimeout(() => {
  //       this.scene.start('DisplayScore', { level: this.score });
  //     }, 1000);
  //   } else {
  //     this.quitGameBtn = new Button(this, config.width / 2, config.height / 2 + 80,
  //       'Button1', 'Button2', 'Exit Game', 'Title');
  //     this.quitGameBtn.setScrollFactor(0);
  //   }
  //   this.gameOver.setScrollFactor(0);
  //   this.displayResult.setScrollFactor(0);
  // }

 
  render() {
    this.game.debug.text(`Elapsed seconds: ${this.game.time.totalElapsedSeconds()}`, 32, 32);
  }
};

export default GameScene;