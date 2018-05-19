<template>
   <div class="main">
     <app-tool-bar 
    :options="options" 
    @updated="options = $event"
    ></app-tool-bar>
   </div>
</template>

<script>
import options from "../assets/json/options";
import ToolBar from "./ToolBar.vue";

export default {
  data() {
    return {
      options
    };
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
