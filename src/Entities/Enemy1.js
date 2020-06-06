import 'phaser';

import Entity from './Entity';
import EnemyLaser from './EnemyLaser';

const ChaserShip = class extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy1', 'ChaserShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  
    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        const laser = new EnemyLaser(
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
    // this.play('sprEnemy1');
  }
  
  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

const GunShip = class extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy1', 'GunShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.play('sprEnemy1');
  }
}
export {ChaserShip, GunShip};