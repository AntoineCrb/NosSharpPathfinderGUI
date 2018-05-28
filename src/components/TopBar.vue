<template>
  <div class="top-bar">
      <div class="title">
        <img class="logo" :src="logoPath">
        <a class="text">Nos#PathfinderGUI</a>
      </div>

      <div class="switch"> <!-- The switcher is from codepen : https://codepen.io/stefgeraets/pen/ExfBd -->
        <input type="checkbox" name="toggle" v-model="theme">
        <label for="toggle"><i></i></label>
        <span></span>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoPath: require("../assets/logo.png"),
      theme: true
    };
  },
  watch: {
    theme() {
      this.$emit("theme", this.theme ? 1 : 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.top-bar {
  background-color: var(--panel-color);
  height: 60px;
  border-bottom: 2px solid;
  border-color: var(--border-color);
  overflow: hidden;

  .title {
    position: absolute;
    padding: 10px;

    .logo {
      width: 40px;
    }

    .text {
      font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial,
        sans-serif;
      font-weight: 500;
      font-size: 1.5em;
      vertical-align: 50%;
      color: var(--text-color);
    }
  }

  .switch {
    width: 60px;
    height: 18px;
    position: absolute;
    right: 40px;
    top: 20px;

    input {
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
      -moz-opacity: 0;
      opacity: 0;
      z-index: 100;
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    label {
      display: block;
      width: 80%;
      height: 100%;
      position: relative;
      background: #1f2736;
      background: linear-gradient(#121823, #161d2b);
      border-radius: 30px 30px 30px 30px;
      box-shadow: inset 0 3px 8px 1px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.2);
      -webkit-transition: all 0.5s ease;
      transition: all 0.5s ease;
    }

    input ~ label i {
      display: block;
      height: 16px;
      width: 16px;
      position: absolute;
      left: 1px;
      top: 1px;
      z-index: 2;
      border-radius: inherit;
      background: #283446;
      /* Fallback */
      background: linear-gradient(#36455b, #283446);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
        0 0 8px rgba(0, 0, 0, 0.3), 0 12px 12px rgba(0, 0, 0, 0.4);
      -webkit-transition: all 0.5s ease;
      transition: all 0.5s ease;
    }

    label + span {
      content: "";
      display: inline-block;
      position: absolute;
      right: 0px;
      top: 5px;
      width: 6px;
      height: 6px;
      border-radius: 10px;
      background: #283446;
      background: gradient-gradient(#36455b, #283446);
      box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.2),
        0 1px 0 rgba(255, 255, 255, 0.1), 0 0 10px rgba(185, 231, 253, 0),
        inset 0 0 8px rgba(0, 0, 0, 0.9), inset 0 -2px 5px rgba(0, 0, 0, 0.3),
        inset 0 -5px 5px rgba(0, 0, 0, 0.5);
      -webkit-transition: all 0.5s ease;
      transition: all 0.5s ease;
      z-index: 2;
    }

    input:checked ~ label {
      + span {
        content: "";
        background: #b9f3fe;
        background: gradient-gradient(#ffffff, #77a1b9);
        box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1),
          0 1px 0 rgba(255, 255, 255, 0.1), 0 0 10px rgba(100, 231, 253, 1),
          inset 0 0 8px rgba(61, 157, 247, 0.8),
          inset 0 -2px 5px rgba(185, 231, 253, 0.3),
          inset 0 -3px 8px rgba(185, 231, 253, 0.5);
      }

      i {
        left: auto;
        left: 63%;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
          0 0 8px rgba(0, 0, 0, 0.3), 0 8px 8px rgba(0, 0, 0, 0.3),
          inset -1px 0 1px #b9f3fe;
        -webkit-transition: all 0.5s ease;
        transition: all 0.5s ease;
      }
    }
  }
}
</style>
