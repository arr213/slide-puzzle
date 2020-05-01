const _ = require('lodash');

class Game {
    constructor(numRows, numColumns) {
        this.state = [];
        this.numRows = numRows;
        this.numColumns = numColumns
        let numTiles = numRows * numColumns;
        for (let i = 0; i < numTiles; i++) {
            this.state.push(i);
        }
        this.state = _.shuffle(this.state);
    }

    move(tileNumber) {

        if (tileNumber === 0) return this;

        let tileIdx = this.state.indexOf(tileNumber);
        let tileRow = this.getRow(tileIdx);
        let tileCol = this.getColumn(tileIdx);

        let blankIdx = this.state.indexOf(0);
        let blankRow = this.getRow(blankIdx);
        let blankCol = this.getColumn(blankIdx);

        if (tileRow !== blankRow && tileCol !== blankCol) return this;

        if (tileRow === blankRow) {
            let grid = this.getGridState();
            grid[tileRow].splice(blankCol, 1);
            grid[tileRow].splice(tileCol, 0, 0);
            this.state = grid.flat();
            return this;
        }

        if (tileCol === blankCol) {
            let grid = this.getGridState();
            if (tileRow > blankRow) {
                for (let i = blankRow; i < tileRow; i++) {
                    grid[i][tileCol] = grid[i + 1][tileCol];
                }
                grid[tileRow][tileCol] = 0;
            } else {
                for (let i = blankRow; i > tileRow; i--) {
                    grid[i][tileCol] = grid[i - 1][tileCol];
                }
                grid[tileRow][tileCol] = 0;
            }
            this.state = grid.flat();
            return this;
        }

    }

    getRow(idx) {
        return Math.floor(idx / this.numColumns);
    }
    getColumn(idx) {
        return idx % this.numColumns;
    }
    getGridState() {
        let grid = [];
        let idx = 0;
        for (let row = 0; row < this.numRows; row++) {
            grid.push([]);
            for (let col = 0; col < this.numColumns; col++) {
                grid[row].push(this.state[idx]);
                idx++;
            }
        }
        return grid;
    }

    logGrid() {
        console.log(this.getGridState().join('\n'));
    }

}

const game = new Game(3, 3);
game.logGrid();
console.log('\n-------------\n');
game.move(5);
game.logGrid();