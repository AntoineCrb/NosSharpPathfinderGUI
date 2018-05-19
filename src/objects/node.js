export default function(x, y) {
    this.x = x;
    this.y = y;
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.type = 0;
    this.opened = false;
    this.closed = false;
    this.parent = null;
};
