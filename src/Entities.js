import 'phaser';

const Entity = class extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }
}


const Player = class extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player");

        this.setData("speed", 200);
        this.play("sprPlayer");

        this.setData("isShooting", false);
        this.setData("timerShootDelay", 10);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
    }

    moveUp() {
        this.body.velocity.y = this.getData("speed");
    }

    moveDown() {
        this.body.velocity.y = this.getData("speed");
    }

    moveLeft() {
        this.body.velocity.x = this.getData("speed");
    }

    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }

    update() {
        this.body.setVelocity(0, 0);

        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

        if (this.getData("isShooting")) {
            if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
              // every game update, increase timerShootTick by one until we reach the value of timerShootDelay  
              this.setData("timerShootTick", this.getData("timerShootTick") + 1);
            }
            else { // when the "manual timer" is triggered:
              var laser = new PlayerLaser(this.scene, this.x, this.y);
              this.scene.playerLasers.add(laser);
            
              this.scene.sfx.laser.play(); // play the laser sound effect
              this.setData("timerShootTick", 0);
            }
        }
    }
    
}

const PlayerLaser = class extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "sprLaserPlayer");
        this.body.velocity.y = -200;
    }
}

class EnemyLaser extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprLaserEnemy0");
      this.body.velocity.y = 200;
    }
}

class ChaserShip extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprEnemy1", "ChaserShip");
      this.body.velocity.y = Phaser.Math.Between(50, 100);

      this.shootTimer = this.scene.time.addEvent({
        delay: 1000,
        callback: function() {
          let laser = new EnemyLaser(
            this.scene,
            this.x,
            this.y
          );
          laser.setScale(this.scaleX);
          this.scene.enemyLasers.add(laser);
        },
        callbackScope: this,
        loop: true
      });
    }

    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
              this.shootTimer.remove(false);
            }
        }
    }
  }
  
  class GunShip extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprEnemy0", "GunShip");
      this.body.velocity.y = Phaser.Math.Between(50, 100);
      this.play("sprEnemy0");
    }
  }
  
  class CarrierShip extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprEnemy2", "CarrierShip");
      this.body.velocity.y = Phaser.Math.Between(50, 100);
      this.play("sprEnemy2");

      this.states = {
        MOVE_DOWN: "MOVE_DOWN",
        CHASE: "CHASE"
      };
      this.state = this.states.MOVE_DOWN;
    }

    update() {
        if (!this.getData("isDead") && this.scene.player) {
            if (Phaser.Math.Distance.Between(
              this.x,
              this.y,
              this.scene.player.x,
              this.scene.player.y
            ) < 320) {
      
              this.state = this.states.CHASE;
            }
      
            if (this.state == this.states.CHASE) {
              let dx = this.scene.player.x - this.x;
              let dy = this.scene.player.y - this.y;
      
              let angle = Math.atan2(dy, dx);
      
              let speed = 100;
              this.body.setVelocity(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
              );
            }
        }
        if (this.x < this.scene.player.x) {
            this.angle -= 5;
          }
          else {
            this.angle += 5;
        }
    }
  }

export {Player, CarrierShip, GunShip, ChaserShip, EnemyLaser} ;
