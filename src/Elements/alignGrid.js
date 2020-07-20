/* global col */
/* eslint no-undef: "error" */
/* global game */
/* eslint no-undef: "error" */

const AlignGrid = class {
  constructor(config) {
    this.config = config;
    if (!config.scene) {
      return;
    }
    if (!config.rows) {
      config.rows = 5;
    }
    if (!config.cols) {
      config.cols = 5;
    }
    if (!config.height) {
      config.height = game.config.height;
    }
    if (!config.width) {
      config.width = game.config.width;
    }
    this.scene = config.scene;

    this.cw = (config.width / config.cols);

    this.ch = (config.height / config.rows);
  }

  show() {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0xff0000);
    for (let i = 0; i < this.config.width; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.config.height);
    }
    for (let i = 0; i < this.config.height; i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.config.width, i);
    }
    this.graphics.strokePath();
  }

  placeAt(xx, yy, obj) {
    const x2 = (this.cw * xx) + (this.cw / 2);
    const y2 = (this.ch * yy) + (this.ch / 2);
    obj.x = x2;
    obj.y = y2;
  }

  placeAtIndex(index, obj) {
    const yy = Math.floor(index / this.config.cols);
    const xx = index - (yy * this.config.cols);
    this.placeAt(xx, yy, obj);
  }

  findNearestIndex(xx, yy) {
    const row = Math.floor(yy / this.ch);
    const index = (row * this.config.cols) + col;
    return index;
  }

  getPosByIndex(index) {
    const yy = Math.floor(index / this.config.cols);
    const xx = index - (yy * this.config.cols);
    const x2 = (this.cw * xx) + (this.cw / 2);
    const y2 = (this.ch * yy) + (this.ch / 2);
    return {
      x: x2,
      y: y2,
    };
  }

  showNumbers() {
    this.show();
    let count = 0;
    for (let i = 0; i < this.config.rows; i += 1) {
      for (let j = 0; j < this.config.cols; j += 1) {
        const numText = this.scene.add.text(0, 0, count, {
          color: '#ff0000',
        });
        numText.setOrigin(0.5, 0.5);
        this.placeAtIndex(count, numText);
        count += 1;
      }
    }
  }
};

export default AlignGrid;