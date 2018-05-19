<template>
   <div class="main">
     <app-tool-bar 
    :options="options"
    :nodeTypes="nodeType"
    @updated="options = $event"
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

import node from "../objects/node";

import GridPanel from "./GridPanel.vue";
import ToolBar from "./ToolBar.vue";

export default {
  data() {
    return {
      options,
      nodeType,
      grid: []
    };
  },
  methods: {
    selectNode(node) {
      let currentType = this.options.selected.nodeType;
      let oldNode = currentType.single
        ? this.grid.find(n => n.type == currentType.id)
        : null;
      if (oldNode) {
        oldNode.type = 0;
      }
      node.type = currentType.id;
    },
    getGrid() {
      this.grid = [];
      for (var x = 0; x < this.options.input.x; x++) {
        for (var y = 0; y < this.options.input.y; y++) {
          this.grid.push(new node(x, y));
        }
      }
    }
  },
  created() {
    this.options.selected.nodeType = nodeType[0];
  },
  mounted() {
    this.getGrid();
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
