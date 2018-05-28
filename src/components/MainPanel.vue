<template>
   <div class="main">
     <app-tool-bar 
    :options="options"
    :pathfinders="Object.keys(pathfinders)"
    :nodeTypes="nodeType"
    :maps="mapsId"
    :heuristics="heuristics"
    @updated="options = $event"
    @reload="getGrid"
    @findPath="findPath"
    ></app-tool-bar>
    <app-grid-panel
    :grid="grid"
    :nodeTypes="nodeType"
    :options="options"
    @selectNode="selectNode($event)"
    ></app-grid-panel>
   </div>
</template>

<script>
import options from "../assets/json/options";
import nodeType from "../assets/json/nodeType";
import maps from "../assets/json/maps";

import node from "../objects/node";
import pathfinders from "../pathfinders/";
import heuristics from "../pathfinders/helpers/heuristic";
import GridPanel from "./GridPanel.vue";
import ToolBar from "./ToolBar.vue";

export default {
  data() {
    return {
      options,
      nodeType,
      pathfinders,
      maps,
      heuristics,
      mapsId: [],
      grid: []
    };
  },
  methods: {
    selectNode(node) {
      let currentType = this.options.selected.nodeType;
      let oldNode = currentType.single // Check if there is a node with the same type and if the type has to be single ex : Start/End
        ? this.grid.find(n => n.type == currentType.id)
        : null;
      if (oldNode) {
        oldNode.type = 0; // default type (Open)
      }
      node.type = currentType.id;
    },
    getGrid() {
      if (this.options.selected.mapId) {
        this.selectMap(this.options.selected.mapId);
        return;
      }
      this.grid = [];
      this.options.selected.mapId = null;
      for (var x = 0; x < this.findInput("x").value; x++) {
        for (var y = 0; y < this.findInput("y").value; y++) {
          this.grid.push(new node(x, y));
        }
      }
    },
    selectMap(id) {
      this.grid = [];
      var map = this.maps.find(m => m.id == id);
      var y = 0,
        x = 0;

      map.nodes.split("").forEach(v => {
        switch (v) {
          case "0":
          case "1":
            var n = new node(x, y);
            n.type = Number(v);
            this.grid.push(n);
            y++;
            break;

          case "|":
            y = 0;
            x++;
            break;
        }
      });
      this.findInput("x").value = x;
      this.findInput("y").value = y;
    },
    findPath() {
      this.clearPath();
      if (!this.options.selected.pathfinder) {
        alert("You have to select a pathfinder.");
        return;
      }
      if (!this.options.selected.heuristic) {
        alert("You have to select a heuristic");
        return;
      }

      let start = this.grid.find(n => n.type == 2);
      let end = this.grid.find(n => n.type == 3);

      if (!start || !end) {
        alert("You have to select the start and the end.");
        return;
      }

      let time = Date.now();
      let path = this.pathfinders[this.options.selected.pathfinder].getPath(
        this.grid,
        start,
        end,
        this.options.selected.diag,
        this.options.selected.heuristic
      );

      this.options.time = Date.now() - time;
      if (path.length < 1) {
        alert("Impossible path.");
        return;
      }

      this.options.nodes = path[0].length;
      path[1].forEach(n => {
        this.grid[n.x * (this.grid[this.grid.length - 1].y + 1) + n.y].type =
          n.type == 0 ? 5 : n.type;
      });

      path[0].forEach(n => {
        this.grid[n.x * (this.grid[this.grid.length - 1].y + 1) + n.y].type =
          n.type == 0 || n.type == 5 ? 4 : n.type;
      });
    },
    clearPath() {
      this.grid.forEach(
        n => (n.type = n.type == 4 || n.type == 5 ? 0 : n.type)
      );
    },
    findInput(name) {
      return this.options.input.find(i => i.name == name);
    }
  },
  watch: {
    "options.selected.mapId"(newId, oldId) {
      if (newId) {
        this.selectMap(newId);
      }
    }
  },
  created() {
    this.options.selected.nodeType = nodeType[0];
  },
  mounted() {
    this.getGrid();
    maps.forEach(m => this.mapsId.push(m.id));
  },
  components: {
    AppToolBar: ToolBar,
    AppGridPanel: GridPanel
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-color: var(--panel-color);
  border: 2px solid;
  border-color: var(--border-color);
}
</style>
