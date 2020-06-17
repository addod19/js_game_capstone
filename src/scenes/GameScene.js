import 'phaser';

import Player from '../Entities/Player';
import {ChaserShip, GunShip} from '../Entities/Enemy1';
import CarrierShip from '../Entities/Enemy2';
import ScrollingBackground from '../Entities/ScrollingBackground';



/* global phaser */
/* eslint no-undef: 'error' */

const GameScene = class extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {

    this.load.audio('sndExplode0', 'assets/laser1.wav');
    this.load.audio('sndExplode1', 'assets/laser1.wav');
    this.load.audio('sndLaser', 'assets/laser1.wav');


    this.load.image('sprBg0', 'assets/content/Background/starBackground.png');
    this.load.image('sprBg1', 'assets/content/Background/starSmall.png');

    
    if (typeof player !== 'undefined') {
      this.body.setVelocity(0, 0);

      this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
      this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer'
    );

    this.backgrounds = [];
    for (let i = 0; i < 5; i++) {
      let bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

  }
  create() {
    // Setting background to full width and height
    // let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sprBg0');
    // let scaleX = this.cameras.main.width / image.width;
    // let scaleY = this.cameras.main.height / image.height;
    // let scale = Math.max(scaleX, scaleY);
    // image.setScale(scale).setScrollFactor(1);

    let bg = this.load.image('sprBg0', 'assets/content/Background/starBackground.png');
    bg.displayHeight = this.sys.game.height;

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1')
      ],
      laser: this.sound.add('sndLaser')
    };

    this.lifes = this.add.image(20, 20, 'sprLifes').setScale(1.6);

    
    this.playerScore = this.add.text(40, 60, 'Score: 0', {
      fontFamily: 'monospace',
      fontSize: 30,
      fontStyle: 'bold',
      color: '#000000',
    });

    this.player.setScale(2);

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      attacked: this.sound.add('loseLife',{ volume: 3}),
      laser: this.sound.add("sndLaser")
    };


    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.load.spritesheet('sprEnemy2', 'assets/content/enemyUFO.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet('sprPlayer', 'assets/content/player.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet('sprExplosion', 'content/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32
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
            if (this.getEnemiesByType('ChaserShip').length < 5) {

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

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      // destroy enemy if hit by laser
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        enemy.body = null;
        playerLaser.destroy();
        // this.player.updateScore(enemy);
        this.playerScore.setText(`Score: this.player.getScore('score)`);
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData("isDead") &&
          !enemy.getData("isDead")) {
        // player.explode(false);
        // enemy.explode(true);
        if (player.getData('health') > 0) {
          enemy.explode(true);
          player.updateLifes();
          this.title2.setText(`X ${this.player.getData('health')}`);
        } else {
          player.explode(false);
          player.onDestroy();
          enemy.explode(true);
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData("isDead") &&
          !laser.getData("isDead")) {
        // player.explode(false);
        // laser.destroy();
        if (player.getData('health') > 0) {
          enemy.explode(true);
          player.updateLifes();
          this.title2.setText(`X ${this.player.getData('health')}`);
        } else {
          player.explode(false);
          player.onDestroy();
          enemy.explode(true);
        }
      }
    });
  }

  update() {
    if (!this.player.getData('isDead')) {
      this.player.update();

      if (this.keyUp.isDown) {
        this.player.moveUp();
      }
      else if (this.keyDown.isDown) {
        this.player.moveDown();
      }
      if (this.keyLeft.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyRight.isDown) {
        this.player.moveRight();
      }
      if (this.keySpace.isDown || this.keyEnter.isDown) {
        this.player.setData('isShooting', true);
      }
      else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
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
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

};

export default GameScene;