import Entity from '../Entities/Entity';


const PlayerLaser = class extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'sprLaserPlayer');
        this.body.velocity.y = -200;
    }
}

export default PlayerLaser;