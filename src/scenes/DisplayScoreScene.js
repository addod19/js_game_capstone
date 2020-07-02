import Phaser from 'phaser';
/* eslint no-undef: "error" */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["preload"] }]  */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["postScore"] }]  */

const DisplayScoreScene = class extends Phaser.Scene {
  constructor() {
    super('DisplayScore');
  }

  create() {

    this.add.text(400, 200, 'Best 5 Marksmen', {
      color: 'white',
      fontSize: '32px ',
      fontFamily: 'san-serif',
    }).setOrigin(0.5, 0.5);

    getScores().then((scores) => {
      const scoreStyle = {
        color: 'white',
        fontSize: '18px ',
      };
      scores.sort((x, y) => y.score - x.score);
      const space = 30;
      for (let i = 0; i < 5; i += 1) {
        if (scores[i] !== undefined) {
          this.add
            .text(
              400,
              240 + space * i,
              `${i + 1}. ${scores[i].user} ${scores[i].score}`,
              scoreStyle,
            )
            .setOrigin(0.5, 0.5);
        }
      }
    });

  const style = 'width: 450px; height: 80px; border: none; font: 30px sans-serif; color: #fff;';
    const btn = this.add.dom(390, 490, 'button', style, 'Guide');
    btn.addListener('click');

    btn.on('click', () => {
      this.model = this.sys.game.globals.model;
      this.model.score = 0;
      this.scene.start('Guide');
    });
  }

};

export default DisplayScoreScene;