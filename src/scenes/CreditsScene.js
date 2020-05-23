import 'phaser';
import config from '../config';

class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsMicroverseText = this.add.text(0, 0, 'Special credits to Microverse', { fontSize: '32px', fill: '#c41425' });
    this.createdByText = this.add.text(0, 0, 'Created By:Daniel Larbi Addo', { fontSize: '26px', fill: '#edc811' });
    this.emailText = this.add.text(0, 0, 'addodaniellarbi@gmail.com', { fontSize: '18px', fill: '#32a852' });
    this.openGameArt = this.add.text(0, 0, 'Special thanks to the Developers at the OpenGameArt, for the sound, music and characters', {fontSize: '20px', fill: '#fff'})
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsMicroverseText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.createdByText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.emailText,
      this.zone,
    );
    Phaser.Display.Align.In.Center(
      this.openGameArt,
      this.zone,
    );

    this.createdByText.setY(1000);
    this.emailText.setY(900);

    this.creditsTween = this.tweens.add({
      targets: this.creditsMicroverseText,
      y: 0,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
    });

    this.createdByTween = this.tweens.add({
      targets: this.createdByText,
      y: 30,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function x() {
      },
    });

    this.emailTween = this.tweens.add({
      targets: this.emailText,
      y: 60,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function x() {
        
      }
    });

    this.creditsOpenTween = this.tweens.add({
      targets: this.openGameArt,
      y: 80,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function x() {
        setTimeout(() => {
          this.scene.start('Title');
        }, 5000);
      }.bind(this),
    });
  }
}

export default CreditsScene;