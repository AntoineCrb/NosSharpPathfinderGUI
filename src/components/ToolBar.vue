<template>
   <div class="toolbar">
      <div class="input" v-for="i in Object.keys(options.input)" :key="i">{{i}} : <input v-model="options.input[i]" type="input" size="10"></div>
      <button v-for="b in options.button" :key="b" @click="Emit(b)">{{b}}</button>
      time : {{options.time}}ms
      <br>
      nodes : {{options.nodes}}
   </div>
</template>

<script>
export default {
  props: ["options"],
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
  height: 100px;
  border-bottom: 2px solid;
  border-color: var(--border-color);
  overflow: hidden;
  padding: 10px;

  .input {
    display: inline-block;
    padding-right: 15px;
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
