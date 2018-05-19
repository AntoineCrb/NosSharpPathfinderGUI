<template>
   <div class="main">
     <app-tool-bar 
    :options="options"
    :nodeTypes="nodeType"
    @updated="options = $event"
    ></app-tool-bar>
   </div>
</template>

<script>
import options from "../assets/json/options";
import nodeType from "../assets/json/nodeType";

import ToolBar from "./ToolBar.vue";

export default {
  data() {
    return {
      options,
      nodeType
    };
  },
  created() {
    this.options.selected.nodeType = nodeType[0];
  },
  components: {
    AppToolBar: ToolBar
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
