<template>
   <div class="toolbar">
      <div class="input" v-for="i in options.input" :key="i.name">{{i.name}} : <input v-model="i.value" :type="i.type" size="10"></div>
      <button v-for="b in options.button" :key="b" @click="Emit(b)" class="button">{{b}}</button>
      <br>
      Pathfinder : 
      <select v-model="options.selected.pathfinder">
         <option v-for="p in pathfinders" :key="p" :value="p" class="button-type">{{p}}</option>
      </select>
      Heuristic : 
      <select v-model="options.selected.heuristic">
         <option v-for="h in heuristics" :key="h.name" :value="h" class="button-type">{{h.name}}</option>
      </select>
      Maps : 
      <select v-model="options.selected.mapId">
         <option v-for="id in maps" :key="id" class="button-type">{{id}}</option>
      </select>
      <br>
      <div class="select-type">
         <div class="block-color" :style="{'background-color': options.selected.nodeType.color }"></div>
         <select v-model="options.selected.nodeType">
            <option v-for="n in nodeTypes.filter(n => !n.special)" :key="n.id" :value="n" class="button-type">{{n.name}}</option>
         </select>
      </div>
      time : {{options.time}}ms
      <br>
      nodes : {{options.nodes}}
   </div>
</template>

<script>
export default {
  props: ["options", "nodeTypes", "maps", "pathfinders", "heuristics"],
  data() {
    return {};
  },
  methods: {
    Emit(event, params) {
      this.$emit(event, params);
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  min-height: 100px;
  border-bottom: 2px solid;
  border-color: var(--border-color);
  overflow: hidden;
  padding: 10px;

  input {
    vertical-align: middle;
  }

  .input {
    display: inline-block;
    padding-right: 15px;
  }

  .button {
    float: right;
  }

  .select-type {
    .button-type {
      margin-right: 5px;
      cursor: pointer;
    }

    .block-color {
      margin-right: 3px;
      background-color: #fff;
      padding: 5px;
      border: 1px solid;
      border-color: black;
      display: inline-block;
    }
  }
}
</style>
