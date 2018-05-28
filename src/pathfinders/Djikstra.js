const AStar = require('./AStar');

export default {
  getPath: function (grid, start, end, diag, heuristic) {
    return AStar.default.getPath(grid, start, end, diag, () => 0);
  }
}