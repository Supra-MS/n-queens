/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function (n) {
  // var solution = [];
  var board = new Board({ n: n });
  // for (var i = 0; i < n; i++) { // 0-4
  //   solution.push(board.attributes[i]);
  // 0: [1, 0, 0, 0],
  // 1: [0, 1, 0, 0],
  // 2: [0, 0, 1, 0],
  // 3: [0, 0, 0, 1]
  // solution[i][i] = 1;
  // }
  for (var i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }
  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

window.countNRooksSolutions = function (n) {
  var solutionCount = 0;
  var emptyBoard = new Board({ n: n });
  var traverseBoard = function (board, rowIndex) {
    if (rowIndex === (n - 1)) {
      solutionCount++;
      return;
    }
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasColConflictAt(colIndex)) {
        traverseBoard(board, rowIndex + 1);
      }
      board.togglePiece(rowIndex, colIndex);
    }
  };
  traverseBoard(emptyBoard, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var board = new Board({n: n});
  var solution = board.rows();
  var hasQueens = false;
  var checkQueens = function(rowIndex) {
    if (rowIndex === n) {
      solution = board.rows();
      hasQueens = true;
      return solution;
    } else {
      for (var colIndex = 0; colIndex < n; colIndex++) {
        board.togglePiece(rowIndex, colIndex);
        if (!board.hasAnyQueensConflicts()) {
          checkQueens(rowIndex + 1);
        }
        if (hasQueens) {
          return;
        }
        board.togglePiece(rowIndex, colIndex);
      }
    }
  };
  checkQueens(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0;
  var emptyBoard = new Board({ n: n });
  var traverseBoard = function (board, rowIndex) {
    if (rowIndex === n) {
      solutionCount++;
      return;
    }
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasAnyQueensConflicts()) {
        traverseBoard(board, rowIndex + 1);
      }
      board.togglePiece(rowIndex, colIndex);
    }
  };
  traverseBoard(emptyBoard, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
