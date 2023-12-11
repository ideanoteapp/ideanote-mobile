<template>
  <ui v-if="main" />
  <welcome @end="openmain" v-if="welcome_" />
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

#app {
  position: absolute;
  top: 0px;
  width: 100vw;
}
</style>

<script>
import ui from "./components/ui.vue";
import welcome from "./components/Welcome.vue";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

//axios.defaults.withCredentials = true;

export default {
  components: {
    ui,
    welcome,
  },
  data: () => {
    return {
      notes: {},
      main: true,
      welcome_: false,
    };
  },
  mounted() {
    this.main = false;
      this.welcome_ = true;
    Filesystem.readdir({
      path: `ideaNote/`,
      directory: Directory.External,
    }).then((result) => {
      if (result === undefined || result.length == 0) {
        this.main = false;
        this.welcome_ = true;
      } else {
        this.main = true;
        this.welcome_ = false;
      }
    });
  },
  methods: {
    openmain() {
      this.main = true;
      this.welcome_ = false;
    },
  },
};
</script>
