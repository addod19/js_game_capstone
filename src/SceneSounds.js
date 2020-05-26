/* eslint no-underscore-dangle: 0 */

const SceneSounds = class {
  constructor() {
    /* Set up private variables */
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false;
  }

  /* Setter and Getter methods */
  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }
}

export default SceneSounds;