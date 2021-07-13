<template>
  <nav>
    <v-app-bar dark class="nav-bar" flat app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        class="title text-uppercase"
        @click="$router.push('/').catch((err) => {})"
      >
        <span class="font-weight-light">book</span>
        <span>shook</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      dark
      class="drawer"
      color="primary"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.icon"
          router
          @click="$router.push(link.route).catch((err) => {})"
        >
          <v-list-item-action>
            <v-icon left>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isAuthenticated: false,
      drawer: true,
      links: [
        {
          icon: 'mdi-book-multiple',
          text: 'Books',
          route: '/',
        },
        {
          icon: 'mdi-pencil-box-multiple-outline',
          text: 'Authors',
          route: '/authors',
          admin: false,
        },
      ],
    };
  },
  methods: {
    async signout() {
      await this.$store.dispatch('signout');
      this.$router.push('/signin');
    },
  },
};
</script>

<style scoped>
.title {
  cursor: pointer;
}
.nav-bar {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
}
.drawer {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1)
  );
}
</style>
