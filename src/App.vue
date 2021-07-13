<template>
  <v-app>
    <v-main class="app">
      <Navbar />
      <vue-page-transition name="fade-in-right">
        <router-view></router-view>
      </vue-page-transition>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.app {
  background-color: #eeeeee;
}
.container {
  margin: 0 auto;
}
</style>
