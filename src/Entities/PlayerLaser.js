import Entity from './Entity';


const PlayerLaser = class extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserPlayer');
    this.body.velocity.y = -200;
  }
};

export default PlayerLaser;