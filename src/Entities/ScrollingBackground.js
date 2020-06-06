const ScrollingBackground = class {
  constructor(scene, key, velocityY) {
    this.scene = scene;
    this.key = key;
    this.velocityY = velocityY;

    this.layers = this.scene.add.group();

    this.createLayers();
  }

  createLayers() {
    for (let i = 0; i < 2; i++) {
      // creating 2 backgrounds will allow continuous scroll
      let layer = this.scene.add.sprite(0, 0, this.key);
      layer.y = (layer.displayHeight * i);
      let flipX = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
      let flipY = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
      layer.setScale(flipX * 2, flipY * 2);
      layer.setDepth(-5 - (i - 1));
      this.scene.physics.world.enableBody(layer, 0);
      layer.body.velocity.y = this.velocityY;

      this.layers.add(layer);
    }
  }
}

export default ScrollingBackground;