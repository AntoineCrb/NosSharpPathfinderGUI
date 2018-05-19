<template>
  <div id="app">
    <app-top-bar @theme="theme($event)"></app-top-bar>
  </div>
</template>

<script>
import Themes from "./assets/json/themes";
import TopBar from "./components/TopBar";

export default {
  components: {
    AppTopBar: TopBar
  },
  methods: {
    theme(id) {
      Themes.find(t => t.id == id).colors.forEach(props =>
        document.documentElement.style.setProperty(props.text, props.value)
      );
    }
  },
  created() {
    this.theme(1); // default theme | 1 = dark
  }
};
</script>

<style lang="scss">
body {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  font-size: 15px;
  width: 100%;
  margin: 0;
  color: var(--text-color);
  background-color: var(--back-color);
  -webkit-transition: 0.1s;
  transition: 0.1s;
}
</style>
