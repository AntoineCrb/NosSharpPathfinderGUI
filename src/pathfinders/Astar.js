var heuristic = require('./helpers/heuristic');

export default {
  getPath: function (grid, start, end) {
    var openList = [],
      closedList = [],
      ret = [],
      lowInd, currentNode, nbors, neighbor, gScore, i, maxY = grid[grid.length - 1].y;

    start.f = start.g = 0;
    openList.push(start);

    while (openList.length > 0) {
      lowInd = 0;
      for (i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[lowInd].f) {
          lowInd = i;
        }
      }
      currentNode = openList[lowInd];

      if (currentNode == end) {
        while (currentNode.parent) {
          ret.push(currentNode);
          currentNode = currentNode.parent;
        }
        return [ret.reverse(), openList.concat(closedList)];
      }

      openList.splice(lowInd, 1);
      closedList.push(currentNode);
      nbors = neighbors(currentNode.x, currentNode.y, maxY);

      for (i = 0; i < nbors.length; i++) {
        neighbor = grid[nbors[i]];
        if (!neighbor || closedList.indexOf(neighbor) != -1 || neighbor.type == 1) {
          continue;
        }

        gScore = currentNode.g + (neighbor.x - currentNode.x === 0 || neighbor.y - currentNode.y === 0) ? 1 : Math.SQRT2;

        if (openList.indexOf(neighbor) == -1) {
          neighbor.h = heuristic.manhattan(Math.abs(neighbor.x - end.x), Math.abs(neighbor.y - end.y));
          openList.push(neighbor);
        } else {
          if (gScore >= neighbor.g) {
            continue;
          }
        }

        neighbor.parent = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;

      }
    }
    return [];
  }
};

function neighbors(x, y, maxY) {
  return [getNode(x - 1, y, maxY), getNode(x + 1, y, maxY), getNode(x, y - 1, maxY), getNode(x, y + 1, maxY), getNode(x - 1, y - 1, maxY), getNode(x + 1, y - 1, maxY), getNode(x - 1, y + 1, maxY), getNode(x + 1, y + 1, maxY)];
}

function getNode(x, y, maxY) {
  return x * (maxY + 1) + y;
}
