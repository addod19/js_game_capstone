import Phaser from 'phaser';
/* eslint no-undef: "error" */
/* eslint import/no-unresolved: "error" */

export default {

  type: Phaser.AUTO,
  parent: 'content',
  width: 1270,
  height: 620,
  zoom: 1,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  dom: {
    createContainer: true,
  },

};