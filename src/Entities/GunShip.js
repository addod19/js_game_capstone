import Phaser from 'phaser';

import Entity from './Entity';

const GunShip = class extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy1', 'GunShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.play('sprEnemy1');
  }
};

export default GunShip;