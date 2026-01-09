'use strict';

class Game {
  constructor(initialState) {
    this.initialState = initialState
      ? initialState.map((row) => [...row])
      : Array.from({ length: 4 }, () => Array(4).fill(0));

    this.state = this.initialState.map((row) => [...row]);
    this.score = 0;
    this.status = 'idle';
  }

  getState() {
    return this.state;
  }

  getScore() {
    return this.score;
  }

  getStatus() {
    return this.status;
  }

  start() {
    if (this.status !== 'idle') {
      return;
    }

    this.status = 'playing';
    this.addRandomTile();
    this.addRandomTile();
  }

  restart() {
    this.state = this.initialState.map((row) => [...row]);
    this.score = 0;
    this.status = 'idle';
  }

  moveLeft() {
    if (this.status !== 'playing') {
      return;
    }

    const changed = this.move((row) => row);

    if (changed) {
      this.addRandomTile();
      this.updateStatus();
    }
  }

  moveRight() {
    if (this.status !== 'playing') {
      return;
    }

    const changed = this.move((row) => row.slice().reverse());

    if (changed) {
      this.addRandomTile();
      this.updateStatus();
    }
  }

  moveUp() {
    if (this.status !== 'playing') {
      return;
    }

    this.state = this.transpose(this.state);

    const changed = this.move((row) => row);

    this.state = this.transpose(this.state);

    if (changed) {
      this.addRandomTile();
      this.updateStatus();
    }
  }

  moveDown() {
    if (this.status !== 'playing') {
      return;
    }

    this.state = this.transpose(this.state);

    const changed = this.move((row) => row.slice().reverse());

    this.state = this.transpose(this.state);

    if (changed) {
      this.addRandomTile();
      this.updateStatus();
    }
  }

  move(transformRow) {
    let changed = false;

    this.state = this.state.map((row) => {
      const original = [...row];
      let newRow = transformRow(row).filter((n) => n !== 0);

      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          this.score += newRow[i];
          newRow[i + 1] = 0;
        }
      }

      newRow = newRow.filter((n) => n !== 0);

      while (newRow.length < 4) {
        newRow.push(0);
      }

      newRow = transformRow(newRow);

      if (!this.arraysEqual(original, newRow)) {
        changed = true;
      }

      return newRow;
    });

    return changed;
  }

  addRandomTile() {
    const emptyCells = [];

    this.state.forEach((row, rIndex) => {
      row.forEach((cell, cIndex) => {
        if (cell === 0) {
          emptyCells.push([rIndex, cIndex]);
        }
      });
    });

    if (!emptyCells.length) {
      return;
    }

    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    const r = randomCell[0];
    const c = randomCell[1];

    this.state[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  updateStatus() {
    if (this.state.flat().includes(2048)) {
      this.status = 'win';

      return;
    }

    if (this.canMove()) {
      this.status = 'playing';
    } else {
      this.status = 'lose';
    }
  }

  canMove() {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.state[r][c] === 0) {
          return true;
        }

        if (c < 3 && this.state[r][c] === this.state[r][c + 1]) {
          return true;
        }

        if (r < 3 && this.state[r][c] === this.state[r + 1][c]) {
          return true;
        }
      }
    }

    return false;
  }

  transpose(state) {
    return state[0].map((_, i) => state.map((row) => row[i]));
  }

  arraysEqual(a, b) {
    return a.every((v, i) => v === b[i]);
  }
}

window.Game = Game;
