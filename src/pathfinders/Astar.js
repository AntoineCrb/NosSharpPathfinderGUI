const utils = require('./helpers/utils');

export default {
  getPath: function (grid, start, end, diag, heuristic) {
    var openList = [],
      closedList = [],
      n, nbors, neighbor, gScore, i, l, low, p = 0;

    var maxY = grid[grid.length - 1].y
    start.f = start.g = 0;
    openList.push(start);

    while (openList.length > 0) {
      var low = 0;
      for (i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[low].f) {
          low = i;
        }
      }

      n = openList[low];

      if (n == end) {
        return [utils.getPath(n), openList.concat(closedList)];
      }

      openList.splice(openList.indexOf(n), 1);
      closedList.push(n);
      nbors = utils.neighbors(n.x, n.y, maxY, diag);

      for (i = 0; i < nbors.length; i++) {
        neighbor = grid[nbors[i]];
        if (!neighbor || closedList.indexOf(neighbor) != -1 || neighbor.type == 1 || Math.abs(neighbor.y - n.y) > 1) {
          continue;
        }

        gScore = n.g + ((neighbor.x - n.x === 0 || neighbor.y - n.y === 0) ? 1 : Math.SQRT2);
        if (openList.indexOf(neighbor) == -1) {
          openList.push(neighbor);
          neighbor.h = heuristic(Math.abs(neighbor.x - end.x), Math.abs(neighbor.y - end.y));
        } else if (gScore >= neighbor.g) {
          continue;
        }

        neighbor.parent = n;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
    return [];
  }
};

function neighbors(x, y) {
  return [getNode(x - 1, y), getNode(x + 1, y), getNode(x, y - 1), getNode(x, y + 1), getNode(x - 1, y - 1), getNode(x + 1, y - 1), getNode(x - 1, y + 1), getNode(x + 1, y + 1)];
}

function getNode(x, y) {
  return x * (maxY + 1) + y;
}
