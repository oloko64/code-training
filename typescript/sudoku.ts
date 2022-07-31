interface Board {
  [index: number]: number[];
}

const GRID_SIZE = 9;
const GRID_BLOCK_SIZE = 3;

function isNumberInRow(board: Board, row: number, number: number): boolean {
  for (let i = 0; i < GRID_SIZE; i++) {
    if (board[row][i] === number) {
      return true;
    }
  }
  return false;
}

function isNumberInColumn(
  board: Board,
  column: number,
  number: number,
): boolean {
  for (let i = 0; i < GRID_SIZE; i++) {
    if (board[i][column] === number) {
      return true;
    }
  }
  return false;
}

function isNumberInBox(
  board: Board,
  number: number,
  boxRow: number,
  boxColumn: number,
): boolean {
  for (let i = 0; i < GRID_BLOCK_SIZE; i++) {
    for (let j = 0; j < GRID_BLOCK_SIZE; j++) {
      if (board[boxRow + i][boxColumn + j] === number) {
        return true;
      }
    }
  }
  return false;
}

function isValidPlace(
  board: Board,
  row: number,
  column: number,
  number: number,
): boolean {
  return (
    !isNumberInRow(board, row, number)
    && !isNumberInColumn(board, column, number)
    && !isNumberInBox(
      board,
      number,
      row - (row % GRID_BLOCK_SIZE),
      column - (column % GRID_BLOCK_SIZE),
    )
  );
}

function solveBoard(board: Board): boolean {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (board[i][j] === 0) {
        for (let number = 1; number <= GRID_SIZE; number++) {
          if (isValidPlace(board, i, j, number)) {
            board[i][j] = number;
            if (solveBoard(board)) {
              return true;
            }
            board[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function printBoard(board: Board): void {
  for (let i = 0; i < GRID_SIZE; i++) {
    if (i % GRID_BLOCK_SIZE === 0 && i !== 0) {
      console.log('-----------------------');
    }
    for (let j = 0; j < GRID_SIZE; j++) {
      if (j % GRID_BLOCK_SIZE === 0 && j !== 0) {
        process.stdout.write('| ');
      }
      process.stdout.write(`${board[i][j]} `);
    }
    console.log();
  }
}

function main() {
  const board: Board = [
    [7, 0, 2, 0, 5, 0, 6, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0],
    [1, 0, 0, 0, 0, 9, 5, 0, 0],
    [8, 0, 0, 0, 0, 0, 0, 9, 0],
    [0, 4, 3, 0, 0, 0, 7, 5, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 8],
    [0, 0, 9, 7, 0, 0, 0, 0, 5],
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 7, 0, 4, 0, 2, 0, 3],
  ];
  console.time('solve');
  console.log('\n   Original board:\n');
  printBoard(board);
  console.log('\n   Solved board:\n');
  solveBoard(board);
  printBoard(board);
  console.log();
  console.timeEnd('solve');
}

main();
