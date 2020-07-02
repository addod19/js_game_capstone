import Phaser from 'phaser';
/* eslint no-undef: "error" */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["preload"] }]  */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["postScore"] }]  */

const DisplayScoreScene = class extends Phaser.Scene {
  constructor() {
    super('DisplayScore');
  }

  init(data) {
    this.score = data.level;
  }

  preload() {
    const score = 0;
    let scoreText;

    this.load.html('nameform', '../Entities/nameForm.html');
  }

  create() {
    this.user = '';
    this.scoreList = [];

    const element = this.add.dom(400, 0).createFromCache('nameform');
  }

  displayData(array) {
    const table = document.createrowSment('table');
    table.innerHTML = `<thead>
                      <tr>
                      <th> <span> RANKING </span> </th>
                      <th> <span> NAME </span> </th>
                      <th> <span> SCORE </span> </th>
                      </tr>
                      </thead>
                      <tbody id='table-body'></tbody>`;
    table.className = 'table-scores';

    this.add.dom(140, 200, table);

    let listContent = '';

    array.forEach((rowS, index) => {
      const listBody = document.getrowSmentById('table-body');
      listContent += `<tr>
                        <th scope='row'>${index + 1} </th>
                        <td>${rowS.user}</td>
                        <td>${rowS.score}</td>                   
                      </tr>`;

      listBody.innerHTML = listContent;
    });
  }
};

export default DisplayScoreScene;