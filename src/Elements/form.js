import AlignGrid from './AlignGrid';

class Form {
  constructor(config) {
    //  super();
    this.scene = config.scene;
    //  get the game height and width
    this.gameWidth = this.scene.game.config.width;
    this.gameHeight = this.scene.game.config.height;
    this.alignGrid = new AlignGrid({
      scene: this.scene,
      rows: config.rows,
      cols: config.cols,
    });
  }

  showNumbers() {
    this.alignGrid.showNumbers();
  }

  scaleToGameW(elName, per) {
    const el = document.getElementById(elName);
    const w = this.gameWidth * per;
    el.style.width = `${w}em`;
    el.style.display = 'block';
  }

  scaleToGameH(elName, per) {
    const el = document.getElementById(elName);
    const h = this.gameHeight * per;
    el.style.height = `${h}em`;
  }

  placeElementAt(index, elName, centerX = true, centerY = false) {
    //  get the position from the grid
    const pos = this.alignGrid.getPosByIndex(index);
    //  destructure local vars
    let { x, y } = pos;

    const el = document.getElementById(elName);

    el.style.position = 'absolute';

    let w = el.style.width;

    w = this.toNum(w);

    if (centerX === true) {
      x -= w / 2;
    }

    let h = el.style.height;

    h = this.toNum(h);

    if (centerY === true) {
      y -= h / 2;
    }
    //  set the positions
    el.style.top = `${y}em`;
    el.style.left = `${x}em`;
  }

  //  changes 10em to 100
  toNum(s) {
    s = s.replace('em', '');
    s = parseInt(s);
    return s;
  }

  //  add a change callback
  addChangeCallback(elName, fun, scope = null) {
    const el = document.getElementById(elName);
    if (scope === null) {
      el.onchange = fun;
    } else {
      el.onchange = fun.bind(scope);
    }
  }

  getTextAreaValue(elName) {
    const el = document.getElementById(elName);
    return el.value;
  }

  getTextValue(elName) {
    const el = document.getElementById(elName);
    return el.innerText;
  }

  addClickCallback(elName, fun, scope = null) {
    const el = document.getElementById(elName);
    if (scope === null) {
      el.onclick = fun;
    } else {
      el.onclick = fun.bind(scope);
    }
  }
}

export default Form;