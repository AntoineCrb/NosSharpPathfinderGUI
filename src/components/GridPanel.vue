<template>
  <div class="panel" :style="{'height': `${grid.length > 1 ? grid[grid.length-1].y * 6 + 20 : 30}px`}" 
      @mousedown="isClicking = true" @mouseleave="isClicking = false" @mouseup="isClicking = false"> <!-- Create -->
      <div class="block-panel">
         <div v-for="n in grid" 
            :key="n.id" class="block"
            @mouseover="selectNode(n)"
            @click="selectNode(n, true)"
            :style="{'top': n.y * 6 + 'px', 'left': n.x * 6 + 'px', 'background-color': nodeTypes.find(t => n.type == t.id).color}">
         </div>
      </div>
   </div>
</template>

<script>
export default {
  props: ["options", "nodeTypes", "grid"],
  data() {
    return {
      isClicking: false
    };
  },
  methods: {
    selectNode(node, forced) {
      if (!this.isClicking && !forced) {
        return;
      }
      this.Emit('selectNode', node)
    },
    Emit(event, params) {
      this.$emit(event, params);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  padding: 20px;
  overflow-x: auto;
  overflow-y: visible;

  .block-panel {
    margin: 0 auto;
    position: relative;

    .block {
      background-color: #fff;
      padding: 3px;
      border: 1px solid;
      border-color: black;
      cursor: pointer;
      width: 0px;
      position: absolute;
    }
  }
}
</style>
