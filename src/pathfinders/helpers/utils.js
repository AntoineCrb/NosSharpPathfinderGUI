function neighbors(x, y, maxY, allowDiag) {
  var pos = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1]
  ].concat(allowDiag ? [
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y - 1],
    [x + 1, y + 1]
  ] : []);

  var pos2 = [];
  for (var i = 0; i < pos.length; i++) {
    pos2.push(pos[i][0] * (maxY + 1) + pos[i][1])
  }
  return pos2;
}
exports.neighbors = neighbors;

function getPath(node) {
  const ret = [];
  while (node.parent) {
    ret.push(node);
    node = node.parent;
  }
  return ret.reverse();
}
exports.getPath = getPath;

function getLowest(list, ele) {
  var lowInd = 0;
  for (var i = 0; i < list.length; i++) {
    if (list[i].f < list[lowInd].f) {
      lowInd = i;
    }
  }
  return lowInd;
}
exports.getLowest = getLowest;
