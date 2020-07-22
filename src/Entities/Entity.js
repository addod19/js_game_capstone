import Phaser from 'phaser';

/* eslint func-names: ["error", "always"] */

const Entity = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type, health) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
    this.setData('health', health);
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      this.setTexture('sprExplosion');
      this.play('sprExplosion');

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on('animationcomplete', () => {
        if (canDestroy) {
          this.destroy();
        } else {
          this.setVisible(false);
        }
      }, this);

      this.setData('isDead', true);
    }
  }
};

export default Entity;