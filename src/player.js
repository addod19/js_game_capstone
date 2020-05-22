// import Phaser from "phaser";
import dude from './assets/play.gif';

const Player = () => {
    // console.log('THis is the player killing the enemy');

    player = this.physics.add.sprite(100, 450, dude);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(dude, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: dude, frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(dude, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    console.log(player);
    
}

export default Player;